import bcrypt from 'bcryptjs';
import { pool } from '../src/infrastructure/db/pool';

const DEFAULT_TENANT_ID = '00000000-0000-0000-0000-000000000001';
const DEFAULT_EMAIL = 'admin@meshcore.local';
const DEFAULT_PASSWORD = 'password123';
const DEFAULT_ROLE = 'tenant_admin';

const run = async () => {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  await pool.query(
    `
    INSERT INTO tenants (id, name, plan)
    VALUES ($1, 'Acme Tenant', 'starter')
    ON CONFLICT (id) DO NOTHING
    `,
    [DEFAULT_TENANT_ID]
  );

  await pool.query(
    `
    INSERT INTO users (tenant_id, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO UPDATE
    SET tenant_id = EXCLUDED.tenant_id,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role
    `,
    [DEFAULT_TENANT_ID, DEFAULT_EMAIL, passwordHash, DEFAULT_ROLE]
  );

  console.log('Seed completed');
  console.log(`Tenant ID: ${DEFAULT_TENANT_ID}`);
  console.log(`Email: ${DEFAULT_EMAIL}`);
  console.log(`Password: ${DEFAULT_PASSWORD}`);
  await pool.end();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
