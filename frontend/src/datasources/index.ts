import { BetDataSource } from "./BetDataSource";
import { GameDataSource } from "./GameDataSource";
import { LeagueDataSource } from "./LeagueDataSource";
import { UserDataSource } from "./UserDataSource";

export const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:3001";

export const userDataSource: UserDataSource = new UserDataSource();
export const leagueDataSource: LeagueDataSource = new LeagueDataSource();
export const gameDataSource: GameDataSource = new GameDataSource();
export const betDataSource: BetDataSource = new BetDataSource();