import { League } from '../datasources/LeagueDataSource';
import { fetchWithAuth } from '../utils/utilsAuth';

export class UserDataSource {

    baseURL: string = "http://localhost:3001/api/user"; // TODO: update /change localhost

    public async signUp(email: string, password: string, username: string): Promise<{ error: string }> {
        const response: Response = await fetch(`${this.baseURL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password, username })
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error in user creation' }
        }

        return { error: "" };
    }

    public async login(email: string, password: string): Promise<{ error: string }> {
        const response: Response = await fetch(`${this.baseURL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error during the login' }
        }
        return { error: "" };
    }

    public async logout() {
        const response: Response = await fetch(`${this.baseURL}/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error during the logout' }
        }

        return { error: "" };
    }

    public async getUserLeagueList(): Promise<League[] | null> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/leagues`, {
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

    public async getCurrentUsername(): Promise<string> {
        const response: Response = await fetchWithAuth(`${this.baseURL}/currentUsername`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        if (!response.ok)
            return "";

        return await response.json();
    }

}