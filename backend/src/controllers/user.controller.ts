import { NextFunction, Request, Response } from "express";
import * as userService from '../services/user.service';
import { User } from '@prisma/client';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, username, password } = req.body;

    const existingUser: User | null = await userService.getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: 'Error: Email already used' });

    const user: User | null = await userService.createUser(email, username, password);
    if (!user)
      res.status(500).json({ error: 'Internal server error' });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user: User | null = await userService.getUserByEmail(email);
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
