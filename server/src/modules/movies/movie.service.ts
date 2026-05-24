import { createMovieRepo, getMoviesRepo } from './movie.repository';
import { redis } from '../../config/redis';
export const createMovieService = async (payload: any) => {
  return createMovieRepo(payload);
};

export const getMovieService = async (query: any) => {
  const cacheKey = `movies:${JSON.stringify(query)}`
  const cachedMovies = await redis.get(cacheKey)
  if (cachedMovies) {
    return JSON.parse(cachedMovies)
  }
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const movies = getMoviesRepo({
    skip,
    take: limit,
    search: query.search || '',
  });

  await redis.set(cacheKey, JSON.stringify(movies), 'EX', 60);
  return movies
};
