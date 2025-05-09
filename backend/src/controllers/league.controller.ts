import { Request, Response } from 'express';
import { LeagueService } from '../services/league.service';
import { League } from '@prisma/client';

export class LeagueController {
    constructor(private leagueService: LeagueService) { }

    async createLeague(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const league = await this.leagueService.createLeague(name);
            res.status(201).json(league);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] createLeague error:', error.message);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async addUser(req: Request, res: Response) {
        try {
            const { leagueId, userId }: { leagueId: string, userId: string } = req.body;
            const result = await this.leagueService.addUser(leagueId, userId);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] addUser error:', error.message);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const { leagueId, userId } = req.body;
            const result: { name: string, id: string } = await this.leagueService.removeUser(leagueId, userId);
            if (result.id)
                res.status(200).json({ success: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] removeUser error:', error.message);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const { leagueId } = req.params;
            const users = await this.leagueService.getUsers(leagueId);
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                console.error('[LeagueController] getUsers error:', error.message);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.error('[LeagueController] unknown error:', error);
                res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    }
}