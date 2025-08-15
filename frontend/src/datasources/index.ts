import { BetDataSource } from "./BetDataSource";
import { GameDataSource } from "./GameDataSource";
import { LeagueDataSource } from "./LeagueDataSource";
import { UserDataSource } from "./UserDataSource";

export const userDataSource = new UserDataSource();
export const leagueDataSource = new LeagueDataSource();
export const gameDataSource = new GameDataSource();
export const betDataSource = new BetDataSource();