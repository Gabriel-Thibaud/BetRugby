import express from "express";
import { authGuard } from "../middlewares/authGuard";

const router = express.Router();

// endpoint to check the token
router.get("/check", authGuard, (req, res) => {
    res.sendStatus(200);
});

export default router;