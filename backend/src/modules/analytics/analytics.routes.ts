import { Router } from 'express';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
export const analyticsRouter = Router();
analyticsRouter.get('/summary', authorize(['platform_admin','tenant_admin','manager']), tenantGuard, async (req, res) => { res.json({ tenantId: req.tenantId, cards: [{ metric: 'activeUsers', value: 42 }, { metric: 'requests24h', value: 18420 }, { metric: 'errorRate', value: '0.4%' }, { metric: 'apiKeys', value: 5 }] }); });
