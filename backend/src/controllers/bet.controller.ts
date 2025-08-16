import { Bet } from "@prisma/client";
import { BetService } from "../services/bet.service";
import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../types";

export class BetController {
  constructor(private betService: BetService) { }

  async createBet(req: AuthenticatedRequest, res: Response) {
    try {
      const userId: string | undefined = req.user?.id;
      const { leagueId, gameId, pointDiff, predictedWinner }: Partial<Bet> = req.body;
      if (userId && leagueId && gameId && pointDiff && predictedWinner) {
        const betId: string = await this.betService.createBet(userId, leagueId, gameId, pointDiff, predictedWinner);
        return res.status(201).json(betId);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[BetController] createBet error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[BetController] unknown error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

  async getBet(req: AuthenticatedRequest, res: Response) {
    try {
      const userId: string | undefined = req.user?.id;
      const leagueId: string = req.params.leagueId;
      const gameId: string = req.params.gameId;
      if (userId && leagueId && gameId) {
        const bet: Bet | null = await this.betService.getBet(userId, leagueId, gameId);
        return res.status(201).json(bet);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[BetController] getBet error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[BetController] unknown error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

}