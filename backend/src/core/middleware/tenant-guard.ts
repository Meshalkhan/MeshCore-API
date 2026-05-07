import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
export const tenantGuard = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !req.tenantId) return next(new AppError('Tenant context missing', 400));
  if (req.user.role !== 'platform_admin' && req.user.tenantId !== req.tenantId) return next(new AppError('Tenant isolation violation', 403));
  return next();
};
