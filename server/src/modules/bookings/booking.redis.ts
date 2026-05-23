import { redis } from '../../config/redis';
const LOCK_DURATION = 300;

export const lockSeat = async (
  showId: string,
  seatId: string,
  userId: string,
) => {
  const key = `lock:${showId}:${seatId}`;
  // const existingLock = await redis.get(key);
  // if (existingLock) {
  //     return false
  // }

  const result = await redis.set(
    key,
    JSON.stringify({ userId }),
    'EX',
    300,
    'NX',
  );

  return result === 'OK';
};

export const unlockSeat = async (showId: string, seatId: string) => {
  const key = `lock:${showId}:${seatId}`;
  await redis.del(key);
};

export const getLockedSeats = async (showId: string) => {
  const keys = await redis.keys(`lock:${showId}:*`);

  return Promise.all(
    keys.map(async (key) => {
      const value = await redis.get(key);
      return { key, value: JSON.parse(value || '{}') };
    }),
  );
};
