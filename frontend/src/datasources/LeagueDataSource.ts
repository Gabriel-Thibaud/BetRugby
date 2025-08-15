import { fetchWithAuth } from "../utils/utilsAuth";

export type League = {
    id: string;
    name: string;
};

export enum DialogType {
    CREATE,
    JOIN
};

export class LeagueDataSource {

    baseURL: string = "http://localhost:3001/api/league";

    public async createLeague(leagueName: string): Promise<{ error: string }> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ name: leagueName })
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in league creation' }
        }

        return { error: "" };
    }

    public async joinLeague(leagueId: string): Promise<{ error: string }> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/join`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ leagueId })
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || "Unable to join league" }
        }

        return { error: "" };
    }
}