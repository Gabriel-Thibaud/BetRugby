import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export function authGuard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token: string = req.cookies ? req.cookies.token : "";

    if (!token)
        return res.status(401).json({ error: "Unauthorized" });

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { id: payload.userId };
        next(); // next thing to do -> controller
    } catch (err: any) {
        if (err.name === 'TokenExpiredError')
            return res.status(401).json({ error: 'Expired token' });

        res.status(401).json({ error: "Invalid token" });
    }
}