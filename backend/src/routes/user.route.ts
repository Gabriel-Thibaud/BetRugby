import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authGuard } from "../middlewares/authGuard";
import { userService } from "../services/services";

const router: Router = express.Router();

const userController: UserController = new UserController(userService);

router.post('/signup', (req, res) => userController.signUp(req, res));
router.post('/login', (req, res) => userController.login(req, res));

router.use(authGuard);
router.post('/logout', (req, res) => userController.logout(req, res));
router.get('/leagues', (req, res) => userController.getLeagueIDs(req, res));
router.get('/scores/:leagueId', (req, res) => userController.getScoresByLeagueId(req, res));
router.get('/currentUsername', (req, res) => userController.getCurrentUsername(req, res));

export default router;
