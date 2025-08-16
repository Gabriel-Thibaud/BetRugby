import { fetchWithAuth } from "../utils/utilsAuth";
import { Bet } from "./BetDataSource";

export type Game = {
    id: string,
    homeTeam: string,
    awayTeam: string,
    competition: string,
    date: Date,
    score?: string,
    bets: Bet[]
}

export class GameDataSource {

    private baseURL: string = "http://localhost:3001/api/game";

    public async getUpcomingGameIDs(): Promise<{ id: string, date: string }[]> {

        const response: Response = await fetchWithAuth(`${this.baseURL}/upcoming`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        if (!response.ok)
            return [];

        return await response.json();
    }

    public async getGameByID(gameId: string): Promise<Game | null> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/${gameId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        if (!response.ok)
            return null;

        return await response.json();
    }

}