import { Worker } from 'bullmq';
import { queueConnection } from '../config/queue';
import { sendBookingEmail } from '../services/email.service';

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, movie } = job.data;
    await sendBookingEmail(email, movie);
  },
  { connection: queueConnection },
);


emailWorker.on('completed', (job) => {
    console.log(`Email job ${job.id} completed`)
})

emailWorker.on('failed', (job, err) => {
    console.error(`Email job ${job?.id} failed`, err)
})