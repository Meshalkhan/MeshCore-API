import { Router } from 'express';
import { z } from 'zod';
import { AuthService } from './auth.service';
const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
const authService = new AuthService();
export const authRouter = Router();
authRouter.post('/login', async (req, res, next) => { try { const { email, password } = schema.parse(req.body); const result = await authService.login(email, password); res.json(result); } catch (error) { next(error); } });
