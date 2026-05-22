import { prisma } from '../../config/db';

export const createMovieRepo = async (data: any) => {
  return prisma.movie.create({ data });
};

export const getMoviesRepo = async ({ skip, take, search }: any) => {
  return prisma.movie.findMany({
    skip,
    take,
    where: { title: { contains: search, mode: 'insensitive' } },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
