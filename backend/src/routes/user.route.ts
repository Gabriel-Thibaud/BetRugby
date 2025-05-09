import express, { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const router: Router = express.Router();

const userService = new UserService();
const userController: UserController = new UserController(userService);

router.post('/signup', (req, res) => userController.signUp(req, res));
router.post('/login', (req, res) => userController.login(req, res));

export default router;
