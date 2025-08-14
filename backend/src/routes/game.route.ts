import express, { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { GameService } from "../services/game.service";
import { GameController } from "../controllers/game.controller";

const router: Router = express.Router();

const gameService: GameService = new GameService();
const gameController: GameController = new GameController(gameService);

router.use(authGuard);
router.get('/upcoming', (req, res) => gameController.getUpcomingGames(req, res))

export default router;
