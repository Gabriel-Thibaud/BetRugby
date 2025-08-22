import express, { Router } from "express";
import { BetController } from "../controllers/bet.controller";
import { authGuard } from "../middlewares/authGuard";
import { betService } from "../services/services";

const router: Router = express.Router();
router.use(authGuard);

const betController: BetController = new BetController(betService);

router.get("/:leagueId/:gameId", (req, res) => betController.getBet(req, res));
router.post("/create", (req, res) => betController.createBet(req, res));

export default router;