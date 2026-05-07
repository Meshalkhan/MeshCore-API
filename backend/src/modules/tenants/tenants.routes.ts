import { Router } from 'express';
import { pool } from '../../infrastructure/db/pool';
import { authorize } from '../../core/middleware/rbac';
export const tenantsRouter = Router();
tenantsRouter.get('/', authorize(['platform_admin']), async (_req, res, next) => { try { const result = await pool.query('SELECT id, name, plan, created_at FROM tenants ORDER BY created_at DESC'); res.json({ data: result.rows }); } catch (error) { next(error); } });
