import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  REDIS_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
});

export const env = envSchema.parse(process.env);
