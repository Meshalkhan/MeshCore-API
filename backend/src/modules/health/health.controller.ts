import { Request, Response } from 'express';
import { asyncHandler } from '../../core/http/async-handler';
import { HealthService } from './health.service';

const healthService = new HealthService();

export class HealthController {
  get = asyncHandler(async (_req: Request, res: Response) => {
    res.json(healthService.getStatus());
  });
}

export const healthController = new HealthController();
