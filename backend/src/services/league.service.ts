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

        await this.db.userLeague.create({
            data: {
                id: ulid(),
                userId,
                leagueId: league.id,
                score: 0,
            },
        });

        return league.id;
    }

    async addUser(leagueId: string, userId: string): Promise<string | { error: string }> {

        const league = await this.db.league.findUnique({
            where: { id: leagueId }
        });

        if (!league)
            return { error: "League not found" };

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

    async getScoresByLeagueId(leagueId: string): Promise<{ userId: string, username: string, score: number }[]> {
        const userLeagues = await this.db.userLeague.findMany({
            where: { leagueId },
            select: {
                userId: true,
                score: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        // to have the following object: {userId: string, username: string, score: numer}
        return userLeagues.map(ul => ({
            userId: ul.userId,
            username: ul.user.username,
            score: ul.score,
        }));
    }
}
