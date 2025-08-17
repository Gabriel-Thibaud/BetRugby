import { League, UserLeague } from '@prisma/client';
import { prisma } from '../prisma/client';
import { ulid } from 'ulid';

export class LeagueService {
    constructor(private db = prisma) { }

    async createLeague(name: string, userId: string): Promise<string> {
        const league: League = await this.db.league.create({
            data: {
                id: ulid(),
                name
            }
        });

        const userLeague: UserLeague = await this.db.userLeague.create({
            data: {
                id: ulid(),
                userId,
                leagueId: league.id,
                score: 0,
            },
        });

        return league.id;
    }

    async addUser(leagueId: string, userId: string): Promise<string> {
        const userLeague: UserLeague = await this.db.userLeague.upsert({
            where: {
                userId_leagueId: {
                    userId,
                    leagueId,
                },
            },
            update: {}, // nothing to do, already in the league
            create: {
                id: ulid(),
                userId,
                leagueId,
                score: 0,
            },
        });
        return userLeague.id;
    }

    async removeUser(leagueId: string, userId: string): Promise<string> {
        await this.db.userLeague.delete({
            where: {
                userId_leagueId: {
                    userId: userId,
                    leagueId: leagueId,
                },
            },
        });
        return userId;
    }
}
