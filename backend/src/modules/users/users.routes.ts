import { Router } from 'express';
import { pool } from '../../infrastructure/db/pool';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
export const usersRouter = Router();
usersRouter.get('/', authorize(['platform_admin','tenant_admin','manager']), tenantGuard, async (req, res, next) => { try { const result = await pool.query('SELECT id, email, role, tenant_id, created_at FROM users WHERE tenant_id = $1 ORDER BY created_at DESC', [req.tenantId]); res.json({ data: result.rows }); } catch (error) { next(error); } });
