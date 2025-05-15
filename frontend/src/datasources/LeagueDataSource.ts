
export class LeagueDataSource {

    baseURL: string = "http://localhost:3001/api/league"; // TODO: update /change localhost

    public async createLeague(leagueName: string): Promise<
    { error: string ; league?  : {id: string, name: string}}
    > {
        const response: Response = await fetch(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({name : leagueName})
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in league creation'}
        }
        
        const league = await response.json();
        return { error: "", league};
    }

    public async joinLeague(leagueId: string): Promise<
    { error: string ; league ? : {id: string, name: string}}
    > {
        const response: Response = await fetch(`${this.baseURL}/join`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Id : leagueId})
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || "Unable to find league"}
        }

        const league = await response.json();
        return { error: "", league};
    }
}