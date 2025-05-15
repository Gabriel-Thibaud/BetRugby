import { Response } from 'express';
import { LeagueService } from '../services/league.service';
import { League, User } from '@prisma/client';
import { AuthenticatedRequest } from '../type';

export class LeagueController {
    constructor(private leagueService: LeagueService) { }

    async createLeague(req: AuthenticatedRequest, res: Response) {
        try {
            const { name }: { name: string } = req.body;
            const userId: string = req.user ? req.user.id : "";
            if (!userId)
                return res.status(500).json({ error: "Internal error: no userID" });

            const league: League = await this.leagueService.createLeague(name, userId);
            return res.status(201).json(league);
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

    async addUser(req: AuthenticatedRequest, res: Response) {
        try {
            const { leagueId, userId }: { leagueId: string, userId: string } = req.body;
            const result: { name: string, id: string } = await this.leagueService.addUser(leagueId, userId);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] addUser error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async removeUser(req: AuthenticatedRequest, res: Response) {
        try {
            const { leagueId, userId } = req.body;
            const result: { name: string, id: string } = await this.leagueService.removeUser(leagueId, userId);
            if (result.id)
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

    async getUsers(req: AuthenticatedRequest, res: Response) {
        try {
            const { leagueId } = req.params;
            const users: User[] = await this.leagueService.getUsers(leagueId);
            return res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] getUsers error:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }
}