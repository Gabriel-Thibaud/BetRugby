
export class LeagueDataSource {

    baseURL: string = "http://localhost:3001/api"; // TODO: update /change localhost

    public async createLeague(leagueName: string): Promise<{ error: string }> {
        const response: Response = await fetch(`${this.baseURL}/league`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({leagueName})
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in league creation' }
        }

        return { error: "" };
    }
}