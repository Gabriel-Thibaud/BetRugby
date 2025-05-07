import express, { Router } from "express";
import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';

const router: Router = express.Router();

const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router.post('/create', leagueController.createLeague);
router.post('/add', leagueController.addUser);
router.get('/users', leagueController.getUsers);

export default router;
