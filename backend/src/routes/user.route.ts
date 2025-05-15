import express, { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { authGuard } from "../middlewares/authGuard";

const router: Router = express.Router();

const userService = new UserService();
const userController: UserController = new UserController(userService);

router.post('/signup', (req, res) => userController.signUp(req, res));
router.post('/login', (req, res) => userController.login(req, res));

router.use(authGuard);
router.post('/logout', (req, res) => userController.logout(req, res));

export default router;
