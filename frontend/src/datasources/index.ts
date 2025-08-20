import { BetDataSource } from "./BetDataSource";
import { GameDataSource } from "./GameDataSource";
import { LeagueDataSource } from "./LeagueDataSource";
import { UserDataSource } from "./UserDataSource";

export const userDataSource: UserDataSource = new UserDataSource();
export const leagueDataSource: LeagueDataSource = new LeagueDataSource();
export const gameDataSource: GameDataSource = new GameDataSource();
export const betDataSource: BetDataSource = new BetDataSource();