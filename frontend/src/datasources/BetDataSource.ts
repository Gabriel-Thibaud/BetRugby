
export class BetDataSource {

    baseURL: string = "http://localhost:3001/api/bet";

    public async createBet(gameId: string, pointDiff: string, predictedWinner: string): Promise<{ error: string }> {

        // TODO: gerer les params et surement faire un enum entre FRA et France women

        const response: Response = await fetch(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ gameId, pointDiff, predictedWinner })
        });

        // TODO: handle response

        return { error: "" };
    }

    public async updateBetStatus(betID: string): Promise<{ error: string }> {

        return { error: "" };
    }
}