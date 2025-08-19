import { BetService } from "./bet.service";
import { GameService } from "./game.service";
import { LeagueService } from "./league.service";
import { UserService } from "./user.service";

export const userService: UserService = new UserService();
export const betService: BetService = new BetService();
export const leagueService: LeagueService = new LeagueService();
export const gameService: GameService = new GameService(userService, betService);