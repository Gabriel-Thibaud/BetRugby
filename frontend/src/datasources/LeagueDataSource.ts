
export class LeagueDataSource {

    baseURL: string = "http://localhost:3001/api/league"; // TODO: update /change localhost

    public async createLeague(leagueName: string): Promise<{ error: string }> {
        console.log("📤 Envoi vers le serveur avec nom :", leagueName);
        const response: Response = await fetch(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : leagueName})
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in league creation' }
        }

        return { error: "" };
    }
}