import { League, User } from '@prisma/client';
import { prisma } from '../prisma/client';
import { ulid } from 'ulid';

export class LeagueService {
    async createLeague(name: string): Promise<League> {
        return prisma.league.create({
            data: {
                id: ulid(),
                name,
                users: []
            },
        });
    }

    async addUser(leagueId: string, userId: string) {
        return prisma.league.update({
            where: { id: leagueId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
    }

    async removeUser(leagueId: string, userId: string) {
        return prisma.league.update({
            where: { id: leagueId },
            data: {
                users: {
                    disconnect: { id: userId },
                },
            },
        });
    }

    async getUsers(leagueId: string) {
        const league = await prisma.league.findUnique({
            where: { id: leagueId },
            include: { users: true },
        });

        if (!league) throw new Error('League not found');
        return league.users;
    }
}
