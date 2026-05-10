import { Request, Response } from 'express';
import { asyncHandler } from '../../core/http/async-handler';
import { TenantsService } from './tenants.service';

const tenantsService = new TenantsService();

export class TenantsController {
  list = asyncHandler(async (_req: Request, res: Response) => {
    const data = await tenantsService.listAll();
    res.json({ data });
  });
}

export const tenantsController = new TenantsController();
