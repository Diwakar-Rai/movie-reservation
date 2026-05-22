import { Router } from 'express';
import { createMovie, getMovies } from './movie.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createMovieSchema } from './movie.schema';
const router = Router();

router.get('/', getMovies);
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createMovieSchema),
  createMovie,
);

export default router;
