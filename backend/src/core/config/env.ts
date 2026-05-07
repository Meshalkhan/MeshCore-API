import dotenv from 'dotenv';
dotenv.config();

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
if (!hasDatabaseUrl) {
  const requiredDbParts = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  requiredDbParts.forEach((key) => {
    if (!process.env[key]) throw new Error(`Missing environment variable: ${key}`);
  });
}

if (!process.env.JWT_SECRET) throw new Error('Missing environment variable: JWT_SECRET');

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL,
  db: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT as string),
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string
  },
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h'
};
