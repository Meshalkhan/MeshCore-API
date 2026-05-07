import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
import { Role } from '../types/auth';
export const authorize = (allowed: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError('Unauthorized', 401));
  if (!allowed.includes(req.user.role as Role)) return next(new AppError('Forbidden', 403));
  return next();
};
