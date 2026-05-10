import { Router } from 'express';
import { authorize } from '../../core/middleware/rbac';
import { tenantsController } from './tenants.controller';

export const tenantsRouter = Router();
tenantsRouter.get('/', authorize(['platform_admin']), tenantsController.list);
