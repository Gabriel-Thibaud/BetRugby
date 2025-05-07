import { NextFunction, Request, Response } from "express";
import { User } from '@prisma/client';
import { UserService } from '../services/user.service'

export class UserController {
  constructor(private userService: UserService) { }

  async signUp(req: Request, res: Response) {
    try {
      const { email, username, password }: { email: string, username: string, password: string } = req.body;

      const existingUser: User | null = await this.userService.getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ error: 'Error: Email already used' });

      const user: User | null = await this.userService.createUser(email, username, password);
      if (!user)
        res.status(500).json({ error: 'Internal server error' });

      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: { email: string, password: string } = req.body;

      const user: User | null = await this.userService.getUserByEmail(email);
      if (!user)
        return res.status(404).json({ error: 'Error: User not found' });

      if (user.password === password)
        return res.status(201).json({ email });
      else
        return res.status(400).json({ error: 'Wrong password' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server Error' });
    }
  };
}
