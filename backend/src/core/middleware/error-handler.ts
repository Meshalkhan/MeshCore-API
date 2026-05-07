import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';
import { logger } from '../../infrastructure/logger/logger';
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const appErr = err instanceof AppError ? err : new AppError('Internal server error');
  logger.error({ err: appErr.message, stack: err.stack }, 'request_error');
  res.status(appErr.statusCode).json({ error: { message: appErr.message, code: appErr.statusCode } });
};
