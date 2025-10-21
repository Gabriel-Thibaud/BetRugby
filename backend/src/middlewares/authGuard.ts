import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import { JWT_SECRET } from "../config";
import { prisma } from "../prisma/client";


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

export async function adminGuard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        console.log(" ENTER IN ADMIN ADMIN ")
        const userId = req.user?.id; // fetch id thanks to authGuard
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isAdmin: true },
        });

        if (!user || !user.isAdmin)
            return res.status(403).json({ error: "Forbidden: Admin access only" });

        next();
    } catch (err) {
        console.error("Error in adminGuard:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}