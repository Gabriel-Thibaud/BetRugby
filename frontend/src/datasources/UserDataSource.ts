
export class UserDataSource {

    baseURL: string = "http://localhost:3001/api/users"; // TODO: update /change localhost

    public async signUp(email: string, password: string, username: string): Promise<{ error: string }> {
        const response: Response = await fetch(`${this.baseURL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
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
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error || 'Error during the login' }
        }

        return { error: "" };
    }

}