import { z } from 'zod';

export const lockSeatsSchema = z.object({
  body: z.object({
    showId: z.string(),
    seatIds: z.array(z.string()).min(1),
  }),
});
