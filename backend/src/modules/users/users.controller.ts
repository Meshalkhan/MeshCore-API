import { Request, Response } from 'express';
import { asyncHandler } from '../../core/http/async-handler';
import { UsersService } from './users.service';

const usersService = new UsersService();

export class UsersController {
  list = asyncHandler(async (req: Request, res: Response) => {
    const data = await usersService.listByTenant(req.tenantId!);
    res.json({ data });
  });
}

export const usersController = new UsersController();
