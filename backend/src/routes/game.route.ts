import express, { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { GameController } from "../controllers/game.controller";
import { gameService } from "../services/services";

const router: Router = express.Router();

const gameController: GameController = new GameController(gameService);

router.use(authGuard);
router.get('/upcoming', (req, res) => gameController.getUpcomingGameIDs(req, res));
router.get('/:gameId', (req, res) => gameController.getGameByID(req, res));

export default router;