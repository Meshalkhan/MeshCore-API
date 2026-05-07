import { NextFunction, Request, Response } from 'express';
declare global { namespace Express { interface Request { tenantId?: string; user?: { id: string; email: string; role: string; tenantId: string; }; } } }
export const requestContext = (req: Request, _res: Response, next: NextFunction) => { req.tenantId = req.header('x-tenant-id') ?? undefined; next(); };
