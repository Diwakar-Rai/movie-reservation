import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { createMovieService, getMovieService } from './movie.service';
import { success } from 'zod';

export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  res.status(201).json({ success: true, data: movie });
});

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
  const movies = await getMovieService(req.query);
  res.status(200).json({ success: true, data: movies });
});
