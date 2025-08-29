import { Response, Request } from "express";
import { GameService } from "../services/game.service";
import { Game } from "@prisma/client";

export class GameController {
    constructor(private gameService: GameService) { }

    async getUpcomingGameIDs(req: Request, res: Response) {
        try {
            const upcomingGameIDs: { id: string, date: Date }[] = await this.gameService.getUpcomingGameIDs()
            return res.status(200).json(upcomingGameIDs);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[GameController] getUpcomingGameIDs error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[GameController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async getGameByID(req: Request, res: Response) {
        try {
            const gameId: string = req.params.gameId;
            const game: Game | null = await this.gameService.getGameByID(gameId)
            return res.status(200).json(game);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[GameController] getGameByID error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[GameController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async getGamesByCompetitionName(req: Request, res: Response) {
        try {
            const competitionName: string = req.params.name;
            const gameIDs: { id: string, date: Date }[] = await this.gameService.getGamesByCompetitionName(competitionName);
            return res.status(200).json(gameIDs);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[GameController] getGamesByCompetitionName error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[GameController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }


}