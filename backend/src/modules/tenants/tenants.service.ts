import { pool } from '../../infrastructure/db/pool';

export class TenantsService {
  async listAll() {
    const result = await pool.query('SELECT id, name, plan, created_at FROM tenants ORDER BY created_at DESC');
    return result.rows;
  }
}
