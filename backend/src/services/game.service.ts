import { prisma } from '../prisma/client';
import { Game } from '@prisma/client';

const API_TOKEN = process.env.BETS_API_TOKEN;
const RUGBY_ID = 8;
const WOMEN_WORLDCUP_ID = 6390;

interface ExternApiGame {
    id: number,
    sport_id: number,
    time: number,
    time_status: number,
    league: {
        id: number,
        name: string,
        cc: string | null
    },
    home: Team,
    away: Team,
    ss: number | string | null,
    round: number
}

interface Team {
    id: number,
    name: string,
    image_id: number,
    cc: string
}

export class GameService {
    constructor(private db = prisma) { }


    // get games that start in at least 1h or more
    async getUpcomingGameIDs(): Promise<{ id: string, date: Date }[]> {
        const inOneHour: Date = new Date(Date.now() + 60 * 60 * 1000);

        const upcomingGameIDs: { id: string, date: Date }[] = await prisma.game.findMany({
            where: {
                date: { gt: inOneHour } // "gt": greater than 
            },
            select: {
                id: true,
                date: true
            },
            orderBy: {
                date: 'asc'
            }
        });

        return upcomingGameIDs;
    }

    async getGameByID(gameID: string): Promise<Game | null> {
        const game: Game | null = await this.db.game.findUnique({
            where: { id: gameID }
        });

        if (!game)
            throw new Error('Game not found');

        return game;
    }

    // fetch Women World Cup(WWC) games from API (from cron)
    async fetchUpcomingWWCGamesFromAPI() {
        const response: Response = await fetch(
            `https://api.b365api.com/v3/events/upcoming?sport_id=${RUGBY_ID}&league_id=${WOMEN_WORLDCUP_ID}&token=${API_TOKEN}`,
            { method: "GET" }
        );

        if (!response.ok)
            throw new Error("Error extern API: fetch upcoming games");

        const responseData: { success: number, pager: {}, results: ExternApiGame[] } = await response.json();
        return responseData.results;
    }

    async syncUpcomingGames() {
        const games: ExternApiGame[] = await this.fetchUpcomingWWCGamesFromAPI();

        // Upsert into DB
        for (const game of games) {
            await this.db.game.upsert({
                where: { id: game.id.toString() },
                update: { ...this.mapGameData(game) },
                create: { ...this.mapGameData(game) },
            });
        }

        return games;
    }

    private mapGameData(apiGame: ExternApiGame): Game {
        return {
            id: apiGame.id.toString(),
            homeTeam: apiGame.home.name,
            awayTeam: apiGame.away.name,
            date: new Date(apiGame.time * 1000), // timestamp of betsAPI are in second, JS expects timestamp in millisecond
            competition: apiGame.league.name,
            score: null
        };
    }

}