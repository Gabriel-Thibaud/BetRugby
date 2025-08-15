import express, { Router } from "express";
import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';
import { authGuard } from "../middlewares/authGuard";

const router: Router = express.Router();
router.use(authGuard);

const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router.post('/create', (req, res) => leagueController.createLeague(req, res));
router.post('/join', (req, res) => leagueController.joinLeague(req, res));

// TODO: check if this endpoint is used
router.get('/users/:leagueId', (req, res) => leagueController.getUsers(req, res));

export default router;
