import express, { Router } from "express";
import * as userController from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

export default router;
