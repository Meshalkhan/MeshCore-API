import { Request, Response } from 'express';
import { asyncHandler } from '../../core/http/async-handler';
import { AnalyticsService } from './analytics.service';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  summary = asyncHandler(async (req: Request, res: Response) => {
    const payload = analyticsService.summary(req.tenantId!);
    res.json(payload);
  });
}

export const analyticsController = new AnalyticsController();
