import { Pool } from 'pg';
import { env } from '../../core/config/env';

const poolConfig = env.databaseUrl
  ? {
      connectionString: env.databaseUrl,
      ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
    }
  : env.db;

export const pool = new Pool(poolConfig);
