import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
export const PORT = process.env.PORT || 4000;
export const isProduction = process.env.NODE_ENV === "production";
export const API_TOKEN = process.env.BETS_API_TOKEN;