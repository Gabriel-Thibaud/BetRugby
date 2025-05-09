import express, { Router } from "express";
import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';

const router: Router = express.Router();

const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router.post('/create', (req, res) => leagueController.createLeague(req, res));
router.post('/add', (req, res) => leagueController.addUser(req, res));
router.get('/users/:leagueId', (req, res) => leagueController.getUsers(req, res));

export default router;
