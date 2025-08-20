import { prisma } from '../prisma/client';
import { League, User } from '@prisma/client';
import { ulid } from 'ulid';
import bcrypt from "bcrypt"

export class UserService {
  constructor(private db = prisma) { }

  async createUser(email: string, username: string, password: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await this.db.user.create({
      data: {
        id: ulid(),
        email,
        username,
        password: hashedPassword
      }
    });
    return user;
  };

  async getUserByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email }
    });
  };

  async getLeaguesByUserId(userId: string): Promise<League[]> {

    const userWithLeagues = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        userLeagues: {
          include: { league: true },
        },
      },
    });

    if (!userWithLeagues)
      return [];

    const leagues: League[] = userWithLeagues.userLeagues.map(userLeague => userLeague.league);

    return leagues;
  }

  async getScoresByLeagueId(leagueId: string): Promise<{ userId: string, username: string, score: number }[]> {
    const userLeagues = await this.db.userLeague.findMany({
      where: { leagueId },
      select: {
        userId: true,
        score: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // to have the following object: {userId: string, username: string, score: numer}
    return userLeagues.map(ul => ({
      userId: ul.userId,
      username: ul.user.username,
      score: ul.score,
    }));
  }

  async updateUserScore(userId: string, leagueId: string, pointsToAdd: number) {
    await this.db.userLeague.update({
      where: {
        userId_leagueId: {
          userId,
          leagueId,
        }
      },
      data: {
        score: {
          increment: pointsToAdd // increment: add pointsToAdd to the current score
        }
      }
    });
  }

  async getUsernameByUserId(userId: string): Promise<string> {
    const result: { username: string; } | null = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
      }
    });

    if (!result)
      return "";

    return result.username;

  }
}
