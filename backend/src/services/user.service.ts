import { prisma } from '../prisma/client';
import { User } from '@prisma/client';
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
      },
    });
    return user;
  };

  async getUserByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
    });
  };
}
