import { prisma } from '../prisma/client';
import { League, Prisma, User } from '@prisma/client';
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

  async getLeagueIDs(userId: string): Promise<League[]> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { leagues: true }
    }) as Prisma.UserGetPayload<{ include: { leagues: true } }> | null;

    if (!user)
      new Error("User not found");

    if (!user?.leagues)
      return [];

    return user?.leagues;
  }
}
