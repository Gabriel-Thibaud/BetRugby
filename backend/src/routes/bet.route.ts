import express, { Router } from "express";
import { BetService } from '../services/bet.service';
import { BetController } from "../controllers/bet.controller";

const router: Router = express.Router();

const betService: BetService = new BetService();
const betControlller: BetController = new BetController(betService);

router.post("/create", (req, res) => betControlller.createBet(req, res));
router.post("/updateStatus", (req, res) => betControlller.updateStatus(req, res));

export default router;
