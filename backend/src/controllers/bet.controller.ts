import { Bet } from "@prisma/client";
import { BetService } from "../services/bet.service";
import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../types";

export class BetController {
  constructor(private betService: BetService) { }

  async createBet(req: AuthenticatedRequest, res: Response) {
    try {
      const userId: string | undefined = req.user?.id;
      const { gameId, pointDiff, predictedWinner }: Partial<Bet> = req.body;
      if (gameId && userId && pointDiff && predictedWinner) {
        const betId: string = await this.betService.createBet(gameId, userId, pointDiff, predictedWinner);
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

  async updateStatus(req: Request, res: Response) {
    try {
      const { id, status }: Partial<Bet> = req.body;
      if (id && status) {
        const updatedBet: Bet = await this.betService.updateStatus(id, status);
        return res.status(200).json(updatedBet);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[BetController] updateBetStatus error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[BetController] unknown error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

}