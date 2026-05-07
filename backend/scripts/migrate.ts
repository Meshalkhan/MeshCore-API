import { pool } from '../src/infrastructure/db/pool';
const run = async () => {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS tenants (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, plan TEXT NOT NULL DEFAULT 'starter', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id UUID NOT NULL REFERENCES tenants(id), email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS api_keys (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id UUID NOT NULL REFERENCES tenants(id), name TEXT NOT NULL, key_hash TEXT NOT NULL, key_prefix TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
  `);
  console.log('Migrations applied');
  await pool.end();
};
run().catch((error) => { console.error(error); process.exit(1); });
