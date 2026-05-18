import { NextFunction, Response } from 'express';
import { AppError } from '../common/errors/AppErrors';
import { AuthRequest } from './auth.middleware';

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Forbidden', 403);
    }

    next();
  };
