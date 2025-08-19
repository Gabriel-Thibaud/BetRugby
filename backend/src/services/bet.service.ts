import { Bet, Game } from '@prisma/client';
import { prisma } from '../prisma/client';
import { ulid } from 'ulid';

export class BetService {
    constructor(private db = prisma) { }

    async createBet(userId: string, leagueId: string, gameId: string, pointDiff: number, predictedWinner: string): Promise<string> {
        const game: Game | null = await this.db.game.findUnique({ where: { id: gameId } });
        if (!game)
            throw new Error("Game not found");

        const bet = await this.db.bet.upsert({
            where: {
                userId_gameId_leagueId: {
                    userId,
                    gameId,
                    leagueId
                }
            },
            update: {
                pointDiff,
                predictedWinner
            },
            create: {
                id: ulid(),
                userId,
                gameId,
                leagueId,
                pointDiff,
                predictedWinner
            }
        });
        return bet.id;
    }

    async updateScore(betId: string, winner: string, homeTeamScore: number, awayTeamScore: number): Promise<number> {

        const bet: Bet | null = await this.db.bet.findUnique({
            where: { id: betId }
        });

        if (!bet)
            return 0;

        let betScore: number = 0;
        if (winner === bet.predictedWinner) {
            betScore += 1; // 1 pt for correctly predicting the winner
            const realPointDiff: number = Math.abs(homeTeamScore - awayTeamScore);
            betScore += this.isPointDiffCorrect(bet.pointDiff, realPointDiff) ? 2 : 0; // 2pts for correctly predicting the point diff
        }

        await this.db.bet.update({
            where: { id: betId },
            data: { score: betScore }
        });

        return betScore;
    }

    async getBet(userId: string, leagueId: string, gameId: string): Promise<Bet | null> {
        const bet: Bet | null = await this.db.bet.findUnique({
            where: {
                userId_gameId_leagueId: {
                    userId,
                    gameId,
                    leagueId
                }
            }
        });

        return bet;
    }

    private isPointDiffCorrect(diffPredicted: number, realDiff: number): boolean {
        switch (diffPredicted) {
            case 10:
                return 0 <= realDiff && realDiff <= 10;
            case 20:
                return 11 <= realDiff && realDiff <= 20;
            case 30:
                return 21 <= realDiff && realDiff <= 30;
            case 31:
                return 31 <= realDiff;
            default:
                return false;
        }
    }
}