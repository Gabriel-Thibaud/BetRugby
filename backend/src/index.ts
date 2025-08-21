import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import leagueRoutes from "./routes/league.route";
import betRoutes from "./routes/bet.route";
import gameRoutes from "./routes/game.route";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import { startGameCronJobs } from "./cron/gameCron";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigin = process.env.NODE_ENV === "production"
  ? "https://betrugby.onrender.com" // frontend prod
  : "http://localhost:3000";        // local dev

app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/bet', betRoutes);
app.use('/api/game', gameRoutes);

// Health check endpoint for Render
// Render pings this endpoint to ensure the service is running and healthy.
app.get("/health", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  startGameCronJobs();
});
