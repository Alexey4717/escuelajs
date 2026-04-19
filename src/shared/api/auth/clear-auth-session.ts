'use server';

import { cookies } from 'next/headers';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_HINT_COOKIE,
  REFRESH_TOKEN_KEY,
} from '../../config/consts/auth';

/** Сброс HttpOnly и флага сессии (без отдельного HTTP route). */
export const clearAuthSession = async (): Promise<void> => {
  const c = await cookies();
  c.delete(ACCESS_TOKEN_KEY);
  c.delete(REFRESH_TOKEN_KEY);
  c.delete(REFRESH_HINT_COOKIE);
};
