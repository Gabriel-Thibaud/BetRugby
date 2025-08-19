import express, { Router } from "express";
import { BetController } from "../controllers/bet.controller";
import { authGuard } from "../middlewares/authGuard";
import { betService } from "../services/services";

const router: Router = express.Router();
router.use(authGuard);

const betControlller: BetController = new BetController(betService);

router.get("/:leagueId/:gameId", (req, res) => betControlller.getBet(req, res));
router.post("/create", (req, res) => betControlller.createBet(req, res));

export default router;