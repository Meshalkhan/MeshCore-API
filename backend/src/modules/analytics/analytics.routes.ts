import { Router } from 'express';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
import { analyticsController } from './analytics.controller';

export const analyticsRouter = Router();
analyticsRouter.get(
  '/summary',
  authorize(['platform_admin', 'tenant_admin', 'manager']),
  tenantGuard,
  analyticsController.summary
);
