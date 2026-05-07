import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../errors/app-error';
import { JwtPayload } from '../types/auth';
export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.header('authorization');
  if (!header) return next(new AppError('Unauthorized', 401));
  const token = header.replace('Bearer ', '').trim();
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.user = { id: decoded.sub, email: decoded.email, role: decoded.role, tenantId: decoded.tenantId };
    if (!req.tenantId) req.tenantId = decoded.tenantId;
    return next();
  } catch { return next(new AppError('Invalid token', 401)); }
};
