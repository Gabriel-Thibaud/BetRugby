import { Response } from 'express';
import { LeagueService } from '../services/league.service';
import { League, User } from '@prisma/client';
import { AuthenticatedRequest } from '../types';

export class LeagueController {
    constructor(private leagueService: LeagueService) { }

    async createLeague(req: AuthenticatedRequest, res: Response) {
        try {
            const { name }: { name: string } = req.body;
            const userId: string = req.user ? req.user.id : "";
            if (!userId)
                return res.status(500).json({ error: "Internal error: no userID" });

            const leagueId: string = await this.leagueService.createLeague(name, userId);
            return res.status(201).json(leagueId);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] createLeague error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async joinLeague(req: AuthenticatedRequest, res: Response) {
        try {
            const { leagueId }: { leagueId: string } = req.body;
            const userId: string = req.user ? req.user.id : "";

            const userLeagueId: string | { error: string } = await this.leagueService.addUser(leagueId, userId);

            if (typeof userLeagueId !== "string")
                return res.status(404).json(userLeagueId);

            return res.status(200).json(userLeagueId);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] addUser error:', error.message);
                return res.status(500).json({ error: "Internal server error" });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async removeUser(req: AuthenticatedRequest, res: Response) {
        try {
            const { leagueId, userId } = req.body;
            const removedUserId: string = await this.leagueService.removeUser(leagueId, userId);
            if (removedUserId)
                return res.status(200).json({ success: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] removeUser error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async getScoresByLeagueId(req: AuthenticatedRequest, res: Response) {
        try {
            const userId: string = req.user ? req.user.id : "";
            if (!userId)
                return res.status(500).json({ error: "Internal error: no userID" });

            const leagueId: string = req.params.leagueId;

            const scores: { userId: string, username: string, score: number }[] = await this.leagueService.getScoresByLeagueId(leagueId);
            return res.status(200).json(scores);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] getScoresByLeagueId error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

}