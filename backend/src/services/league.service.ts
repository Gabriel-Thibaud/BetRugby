import { League } from '@prisma/client';
import { prisma } from '../prisma/client';
import { ulid } from 'ulid';

export class LeagueService {
    constructor(private db = prisma) { }

    async createLeague(name: string, userId: string): Promise<League> {
        return this.db.league.create({
            data: {
                id: ulid(),
                name,
                users: {
                    connect: { id: userId },
                },
            },
        });
    }

    async addUser(leagueId: string, userId: string) {
        return this.db.league.update({
            where: { id: leagueId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
    }

    async removeUser(leagueId: string, userId: string) {
        return this.db.league.update({
            where: { id: leagueId },
            data: {
                users: {
                    disconnect: { id: userId },
                },
            },
        });
    }

    async getUsers(leagueId: string) {
        const league = await this.db.league.findUnique({
            where: { id: leagueId },
            include: { users: true },
        });

        if (!league) throw new Error('League not found');
        return league.users;
    }
}
