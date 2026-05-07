import pino from 'pino';
import { env } from '../../core/config/env';
export const logger = pino({ level: env.nodeEnv === 'production' ? 'info' : 'debug' });
