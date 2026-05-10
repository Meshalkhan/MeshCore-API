import { pool } from '../../infrastructure/db/pool';

export class UsersService {
  async listByTenant(tenantId: string) {
    const result = await pool.query(
      'SELECT id, email, role, tenant_id, created_at FROM users WHERE tenant_id = $1 ORDER BY created_at DESC',
      [tenantId]
    );
    return result.rows;
  }
}
