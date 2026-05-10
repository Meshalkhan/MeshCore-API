import { Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../core/http/async-handler';
import { AuthService } from './auth.service';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const authService = new AuthService();

export class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.login(email, password);
    res.json(result);
  });
}

export const authController = new AuthController();
