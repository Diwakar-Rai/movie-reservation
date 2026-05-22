import { createMovieRepo, getMoviesRepo } from './movie.repository';
export const createMovieService = async (payload: any) => {
  return createMovieRepo(payload);
};

export const getMovieService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  return getMoviesRepo({
    skip,
    take: limit,
    search: query.search || '',
  });
};
