import { Request, Response } from 'express';
import { LeagueService } from '../services/league.service';

const leagueService = new LeagueService();

export class LeagueController {
    async createLeague(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const league = await leagueService.createLeague(name);
            res.status(201).json(league);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addUser(req: Request, res: Response) {
        try {
            const { leagueId, userId } = req.body;
            const result = await leagueService.addUser(leagueId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const { leagueId, userId } = req.body;
            const result = await leagueService.removeUser(leagueId, userId);
            res.status(200).json({ success: true, deletedCount: result.count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const { leagueId } = req.params;
            const users = await leagueService.getUsers(leagueId);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}