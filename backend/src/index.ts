import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import leagueRoutes from "./routes/league.route";
import betRoutes from "./routes/bet.route";
import gameRoutes from "./routes/game.route"
import dotenv from "dotenv";
import { startGameCronJobs } from "./cron/gameCron";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use('/api/user', userRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/bet', betRoutes);
app.use('/api/game', gameRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  startGameCronJobs();
});



