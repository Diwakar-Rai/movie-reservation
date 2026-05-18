import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';
import { rateLimiter } from './middleware/rateLimit.middleware';

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res
    .status(200)
    .json({ success: true, uptime: process.uptime(), timeStamp: new Date() });
});
app.use('/api/v1', routes);
app.use(errorMiddleware);
export default app;
