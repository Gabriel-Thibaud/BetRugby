import { Bet, Game } from '@prisma/client';
import { prisma } from '../prisma/client';
import { ulid } from 'ulid';

export class BetService {
    constructor(private db = prisma) { }

    async createBet(gameId: string, userId: string, pointDiff: number, predictedWinner: string): Promise<Bet> {
        const game: Game | null = await this.db.game.findUnique({ where: { id: gameId } });
        if (!game)
            throw new Error("Game not found");

        const bet: Bet = await this.db.bet.create({
            data: {
                id: ulid(),
                gameId,
                userId,
                pointDiff,
                predictedWinner
            }
        });
        return bet;
    }

    async updateStatus(betId: string, status: string): Promise<Bet> {
        return this.db.bet.update({
            where: { id: betId },
            data: { status }
        });
    }

}