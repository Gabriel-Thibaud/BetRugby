import { Response, Request } from "express";
import { User } from '@prisma/client';
import { UserService } from '../services/user.service';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const isProduction = process.env.NODE_ENV === "production";

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

      // after signup, user is logged in (so a token is required)
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 3600 * 1000, // 1h
      });

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
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(404).json({ error: 'Error: Invalid credentials' });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 3600 * 1000, // 1h
      });
      return res.status(200).json({ message: "Logged in" });

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

  async logout(req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out" });
  }
}
