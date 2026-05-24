import { Queue } from 'bullmq';
import { queueConnection } from '../config/queue';
export const emailQueue = new Queue('emailQueue', {
  connection: queueConnection,
});
