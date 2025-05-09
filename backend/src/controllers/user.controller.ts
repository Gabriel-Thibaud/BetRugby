import { NextFunction, Request, Response } from "express";
import { User } from '@prisma/client';
import { UserService } from '../services/user.service'

export class UserController {
  constructor(private userService: UserService) { }

  async signUp(req: Request, res: Response) {
    try {
      const { email, username, password }: Partial<User> = req.body;
      if (!email || !username || !password)
        return res.status(400).json({ error: 'Error: Email, username or password is missing' });;

      const existingUser: User | null = await this.userService.getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ error: 'Error: Email already used' });

      const user: User | null = await this.userService.createUser(email, username, password);
      if (!user)
        return res.status(500).json({ error: 'Internal server error' });

      return res.status(201).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        console.error('[UserController] signUP error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[UserController] unknown error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  };

  async login(req: Request, res: Response) {
    try {
      const { email, password }: { email: string, password: string } = req.body;

      const user: User | null = await this.userService.getUserByEmail(email);
      if (!user)
        return res.status(404).json({ error: 'Error: User not found' });

      if (user.password === password)
        return res.status(201).json({ email });
      else
        return res.status(400).json({ error: 'Wrong password' });
    } catch (error) {
      if (error instanceof Error) {
        console.error('[UserController] login error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('[UserController] unknown error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  };
}
