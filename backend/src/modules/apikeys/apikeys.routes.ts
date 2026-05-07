import { Router } from 'express';
import crypto from 'crypto';
import { pool } from '../../infrastructure/db/pool';
import { authorize } from '../../core/middleware/rbac';
import { tenantGuard } from '../../core/middleware/tenant-guard';
export const apiKeysRouter = Router();
apiKeysRouter.get('/', authorize(['platform_admin','tenant_admin']), tenantGuard, async (req, res, next) => { try { const result = await pool.query('SELECT id, name, key_prefix, created_at FROM api_keys WHERE tenant_id = $1 ORDER BY created_at DESC', [req.tenantId]); res.json({ data: result.rows }); } catch (error) { next(error); } });
apiKeysRouter.post('/', authorize(['platform_admin','tenant_admin']), tenantGuard, async (req, res, next) => { try { const rawKey = crypto.randomBytes(24).toString('hex'); const keyPrefix = rawKey.slice(0, 8); const name = String(req.body.name ?? 'default-key'); await pool.query('INSERT INTO api_keys (tenant_id, name, key_hash, key_prefix) VALUES ($1, $2, $3, $4)', [req.tenantId, name, rawKey, keyPrefix]); res.status(201).json({ key: rawKey, keyPrefix }); } catch (error) { next(error); } });
