import { prisma } from '../prisma/client';
import { Game } from '@prisma/client';
import { BetService } from './bet.service';
import { UserService } from './user.service';

const API_TOKEN = process.env.BETS_API_TOKEN;
const RUGBY_ID = 8;
const WOMEN_WORLDCUP_ID = 41345; // old id: 6390;

interface ExternApiGame {
    id: string,
    sport_id: string,
    time: string,
    time_status: string,
    league: {
        id: string,
        name: string,
        cc: string | null
    },
    home: Team,
    away: Team,
    "o_home"?: Team,
    "o_away"?: Team,
    ss: string, // score "home-away" (ex: "31-23")
    round: number
}

interface Team {
    id: string,
    name: string,
    image_id: string,
    cc: string
}

export class GameService {
    constructor(private userService: UserService, private betService: BetService, private db = prisma) { }


    // get games that start in at least 1h or more
    async getUpcomingGameIDs(): Promise<{ id: string, date: Date }[]> {

        const upcomingGameIDs: { id: string, date: Date }[] = await prisma.game.findMany({
            where: {
                date: { gt: new Date(Date.now()) } // "gt": greater than 
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
        const gameTime: number = Number(apiGame.time);
        return {
            id: apiGame.id.toString(),
            homeTeam: apiGame.home.name,
            awayTeam: apiGame.away.name,
            date: new Date(gameTime * 1000), // timestamp of betsAPI are in second, JS expects timestamp in millisecond
            competition: apiGame.league.name,
            score: null,
            winner: null
        };
    }

    async fetchTodayGameScores() {

        const today: string = this.getTodayDateFormatted(); // YYYYMMDD
        const response: Response = await fetch(
            `https://api.b365api.com/v3/events/ended?sport_id=${RUGBY_ID}&league_id=${WOMEN_WORLDCUP_ID}&day${today}=&token=${API_TOKEN}`,
            { method: "GET" }
        );

        if (!response.ok)
            throw new Error("Error extern API: fetch today games scores");

        const responseData: { success: number, pager: {}, results: ExternApiGame[] } = await response.json();
        return responseData.results;
    }

    async syncGameScores() {
        const todayGames: ExternApiGame[] = await this.fetchTodayGameScores();

        if (!todayGames.length)
            return;

        for (const game of todayGames) {
            const dbGame = await this.db.game.findUnique({
                where: { id: game.id },
                include: { bets: true }
            });

            if (!dbGame || dbGame.score || dbGame.winner)
                continue;

            const homeTeamScore: number = Number(game.ss.split("-")[0]);
            const awayTeamScore: number = Number(game.ss.split("-")[1]);

            const winner: string = homeTeamScore === awayTeamScore ?
                "Equality" :
                homeTeamScore - awayTeamScore > 0 ? game.home.name : game.away.name;

            await this.db.game.update({
                where: { id: game.id },
                data: {
                    score: game.ss,
                    winner
                }
            });

            for (const bet of dbGame.bets) {
                const betScore: number = await this.betService.updateScore(bet.id, winner, homeTeamScore, awayTeamScore);
                if (betScore)
                    await this.userService.updateUserScore(bet.userId, bet.leagueId, betScore);
            }

        }
    }

    private getTodayDateFormatted(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 because January = 0
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}${month}${day}`;
    }

}