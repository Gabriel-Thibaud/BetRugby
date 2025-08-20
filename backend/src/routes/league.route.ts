import express, { Router } from "express";
import { leagueService } from '../services/services';
import { LeagueController } from '../controllers/league.controller';
import { authGuard } from "../middlewares/authGuard";

const router: Router = express.Router();
router.use(authGuard);

const leagueController = new LeagueController(leagueService);

router.post('/create', (req, res) => leagueController.createLeague(req, res));
router.post('/join', (req, res) => leagueController.joinLeague(req, res));
router.get('/scores/:leagueId', (req, res) => leagueController.getScoresByLeagueId(req, res));

export default router;
