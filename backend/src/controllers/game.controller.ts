import { Response, Request } from "express";
import { GameService } from "../services/game.service";
import { Game } from "@prisma/client";

export class GameController {
    constructor(private gameService: GameService) { }

    async getUpcomingGames(req: Request, res: Response) {
        try {
            const upcomingMatches: Game[] = await this.gameService.getUpcomingGames()
            return res.status(200).json(upcomingMatches);
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