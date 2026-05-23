import { AppError } from '../../common/errors/AppErrors';
import { lockSeat, unlockSeat } from './booking.redis';
import { prisma } from '../../config/db';
export const lockSeatsService = async (
  showId: string,
  seatIds: string[],
  userId: string,
) => {
  const lockedSeats: string[] = [];
  try {
    for (const seatId of seatIds) {
      const locked = await lockSeat(showId, seatId, userId);
      if (!locked) {
        throw new AppError(`Seat ${seatId} already locked`, 400);
      }
      lockedSeats.push(seatId);
    }

    return lockedSeats;
  } catch {
    await Promise.all(lockedSeats.map((seatId) => unlockSeat(showId, seatId)));
    throw new AppError('Some seats are already locked', 400);
  }
};

export const confirmBookingService = async ({
  userId,
  showId,
  seatIds,
  totalAmount,
}: any) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: { userId, showId, totalAmount, status: 'CONFIRMED' },
    });

    await tx.bookedSeat.createMany({
      data: seatIds.map((seatId: string) => ({
        bookingId: booking.id,
        seatId,
      })),
    });

    return booking;
  });
};
