import { fetchWithAuth } from "../utils/utilsAuth";

export type Bet = {
    id: string,
    gameId: string,
    userId: string,
    leagueId: string,
    pointDiff: string,
    status: string, // change to Enum ?
    predictedWinner: string
}

export class BetDataSource {

    baseURL: string = "http://localhost:3001/api/bet";

    public async createBet(leagueId: string, gameId: string, pointDiff: number, predictedWinner: string): Promise<{ error: string }> {

        const response: Response = await fetchWithAuth(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ leagueId, gameId, pointDiff, predictedWinner })
        });

        if (!response.ok)
            return { error: "Error in bet creation" };

        return { error: "" };
    }

    public async getBet(leagueId: string, gameId: string): Promise<Bet | null> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/${leagueId}/${gameId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        });

        if (!response.ok)
            return null;

        return await response.json();
    }

    public async updateBetStatus(betID: string): Promise<{ error: string }> {

        return { error: "" };
    }
}