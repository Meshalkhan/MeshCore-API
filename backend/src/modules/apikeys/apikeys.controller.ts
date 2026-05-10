import { Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../core/http/async-handler';
import { ApiKeysService } from './apikeys.service';

const createSchema = z.object({
  name: z.string().trim().min(1).max(128).optional()
});

const apiKeysService = new ApiKeysService();

export class ApiKeysController {
  list = asyncHandler(async (req: Request, res: Response) => {
    const data = await apiKeysService.listByTenant(req.tenantId!);
    res.json({ data });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createSchema.parse(req.body);
    const name = parsed.name?.length ? parsed.name : 'default-key';
    const created = await apiKeysService.create(req.tenantId!, name);
    res.status(201).json(created);
  });
}

export const apiKeysController = new ApiKeysController();
