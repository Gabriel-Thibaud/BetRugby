import express, { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const router: Router = express.Router();

const userService = new UserService();
const userController: UserController = new UserController(userService);

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

export default router;
