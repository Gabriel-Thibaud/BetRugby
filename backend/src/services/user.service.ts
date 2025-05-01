import { prisma } from '../prisma/client';
import { User } from '@prisma/client';
import { ulid } from 'ulid';

export async function createUser(email: string, username: string, password: string): Promise<User | null> {
  const user = await prisma.user.create({
    data: {
      id: ulid(),
      email,
      username,
      password, // TODO : hasher ici plus tard
    },
  });
  return user;
};

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
};
