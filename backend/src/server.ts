import app from './app';
import { env } from './core/config/env';
import { logger } from './infrastructure/logger/logger';

app.listen(env.port, () => {
  logger.info(`MeshCore API running on port ${env.port}`);
});
