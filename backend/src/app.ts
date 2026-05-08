import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { logger } from './infrastructure/logger/logger';
import { requestContext } from './core/middleware/request-context';
import { errorHandler } from './core/middleware/error-handler';
import { v1Router } from './routes/v1';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500, standardHeaders: true }));
app.use(pinoHttp({ logger }));
app.use(requestContext);
app.use('/api/v1', v1Router);
app.use('/v1', v1Router);
app.use(errorHandler);

export default app;
