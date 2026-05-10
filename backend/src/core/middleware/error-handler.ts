import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error';
import { env } from '../config/env';
import { logger } from '../../infrastructure/logger/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Invalid request',
        code: 400,
        fields: err.flatten().fieldErrors
      }
    });
  }

  const isApp = err instanceof AppError;
  const statusCode = isApp ? err.statusCode : 500;
  const exposeDetail = env.nodeEnv !== 'production';

  logger.error(
    { err: err.message, status: statusCode, ...(exposeDetail ? { stack: err.stack } : {}) },
    'request_error'
  );

  const message = isApp
    ? err.message
    : exposeDetail
      ? err.message || 'Internal server error'
      : 'Internal server error';

  return res.status(statusCode).json({
    error: { message, code: statusCode }
  });
};
