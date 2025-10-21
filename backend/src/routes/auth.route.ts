import express from "express";
import { adminGuard, authGuard } from "../middlewares/authGuard";

const router = express.Router();

// endpoint to check the token
router.get("/check", authGuard, (req, res) => {
    res.sendStatus(200);
});

// endpoint to check admin access
router.get("/check-admin", authGuard, adminGuard, (req, res) => {
    res.sendStatus(200);
});

export default router;