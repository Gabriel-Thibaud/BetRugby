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
                    leagueId,
                },
            },
            update: {
                pointDiff,
                predictedWinner,
            },
            create: {
                id: ulid(),
                userId,
                gameId,
                leagueId,
                pointDiff,
                predictedWinner,
            },
        });
        return bet.id;
    }

    async updateStatus(betId: string, status: string): Promise<Bet> {
        return this.db.bet.update({
            where: { id: betId },
            data: { status }
        });
    }

    async getBet(userId: string, leagueId: string, gameId: string): Promise<Bet | null> {
        const bet: Bet | null = await this.db.bet.findUnique({
            where: {
                userId_gameId_leagueId: {
                    userId,
                    gameId,
                    leagueId,
                },
            },
        });

        return bet;
    }
}