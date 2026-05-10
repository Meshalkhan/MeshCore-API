import { Router } from 'express';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
import { apiKeysController } from './apikeys.controller';

export const apiKeysRouter = Router();
apiKeysRouter.get('/', authorize(['platform_admin', 'tenant_admin']), tenantGuard, apiKeysController.list);
apiKeysRouter.post('/', authorize(['platform_admin', 'tenant_admin']), tenantGuard, apiKeysController.create);
