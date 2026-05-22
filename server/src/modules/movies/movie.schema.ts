import { z } from 'zod';
export const createMovieSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().min(10),
    duration: z.number().min(1),
    genre: z.string(),
    language: z.string(),
    releaseDate: z.string(),
  }),
});
