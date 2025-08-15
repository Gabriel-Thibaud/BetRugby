import { fetchWithAuth } from "../utils/utilsAuth";

export type Bet = {
    id: string,
    game: string,
    userId: string,
    pointDiff: string,
    status: string, // change to Enum ?
    predictedWinner: string
}

export class BetDataSource {

    baseURL: string = "http://localhost:3001/api/bet";

    public async createBet(gameId: string, pointDiff: number, predictedWinner: string): Promise<{ error: string }> {

        const response: Response = await fetchWithAuth(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ gameId, pointDiff, predictedWinner })
        });

        if (!response.ok)
            return { error: "Error in bet creation" };

        return { error: "" };
    }

    public async updateBetStatus(betID: string): Promise<{ error: string }> {

        return { error: "" };
    }
}