import { Bet } from "@prisma/client";
import { BetService } from "../services/bet.service";
import { Request, Response } from 'express';

export class BetController {
  constructor(private betService: BetService) { }

  async createBet(req: Request, res: Response) {
    try {
      const { gameId, userId, pointDiff, predictedWinner }: Partial<Bet> = req.body;
      if (gameId && userId && pointDiff && predictedWinner) {
        const bet: Bet = await this.betService.createBet(gameId, userId, pointDiff, predictedWinner);
        res.status(201).json(bet);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[BetController] createBet error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[BetController] unknown error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id, status }: Partial<Bet> = req.body;
      if (id && status) {
        const bet: Bet = await this.betService.updateStatus(id, status);
        res.status(201).json(bet);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[BetController] updateBetStatus error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[BetController] unknown error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  }

}