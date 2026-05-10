import { Router } from 'express';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
import { usersController } from './users.controller';

export const usersRouter = Router();
usersRouter.get('/', authorize(['platform_admin', 'tenant_admin', 'manager']), tenantGuard, usersController.list);
