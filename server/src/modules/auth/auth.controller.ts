import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { generateAccessToken, generateRefreshToken } from './auth.utils';
import { AppError } from '../../common/errors/AppErrors';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { prisma } from '../../config/db';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);

  res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError('Unauthorized', 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
      userId: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    const accessToken = generateAccessToken(user.id, user.role);
    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
