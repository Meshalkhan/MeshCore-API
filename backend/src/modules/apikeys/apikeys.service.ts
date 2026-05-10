import crypto from 'crypto';
import { pool } from '../../infrastructure/db/pool';

export class ApiKeysService {
  async listByTenant(tenantId: string) {
    const result = await pool.query(
      'SELECT id, name, key_prefix, created_at FROM api_keys WHERE tenant_id = $1 ORDER BY created_at DESC',
      [tenantId]
    );
    return result.rows;
  }

  async create(tenantId: string, name: string) {
    const rawKey = crypto.randomBytes(24).toString('hex');
    const keyPrefix = rawKey.slice(0, 8);
    await pool.query('INSERT INTO api_keys (tenant_id, name, key_hash, key_prefix) VALUES ($1, $2, $3, $4)', [
      tenantId,
      name,
      rawKey,
      keyPrefix
    ]);
    return { key: rawKey, keyPrefix };
  }
}
