import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

export function authGuard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token: string = req.cookies ? req.cookies.token : "";

    if (!token)
        return res.status(401).json({ error: "Unauthorized" });

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { id: payload.userId };
        next(); // next thing to do -> contoller
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}