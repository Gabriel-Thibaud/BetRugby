import { Response, Request } from "express";
import { AuthenticatedRequest } from "../types";
import { GameService } from "../services/game.service";

export class GameController {
    constructor(private gameService: GameService) { }

    async getUpcomingGames(req: Request, res: Response) {
        try {
            const upcomingMatches = await this.gameService.getUpcomingGames()
            return res.status(201).json(upcomingMatches);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[GameController] getIncomingGames error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[GameController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }


}