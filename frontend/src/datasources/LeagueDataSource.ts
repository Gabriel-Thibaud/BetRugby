
export class LeagueDataSource {

    baseURL: string = "http://localhost:3001/api/league"; // TODO: update /change localhost

    public async createLeague(leagueName: string): Promise<{ error: string ; league: {id: string, name: string}}> {
        const response: Response = await fetch(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : leagueName})
        });
        const league = await response.json();

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in league creation', league }
        }
        return { error: "", league};
    }

    public async addLeague(leagueId: string): Promise<{ error: string }> {
        const response: Response = await fetch(`${this.baseURL}/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : leagueId})
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in adding league' }
        }
        
        return { error: "" };
    }
}