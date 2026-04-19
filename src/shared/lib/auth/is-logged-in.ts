import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../config/consts/auth';
import { hasRefreshTokenHint } from './auth-refresh-hint.client';

/**
 * Сервер: читаем HttpOnly `access_token` / `refresh_token` из cookie.
 *
 * Клиент: эти токены в JS недоступны (и в localStorage мы их не кладём — только cookie через BFF).
 * Приблизительный признак сессии — читаемый флаг `auth_has_refresh` (см. `auth-refresh-hint.client`).
 */
export const defineIsLoggedIn = async (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const c = await cookies();
    return Boolean(
      c.get(ACCESS_TOKEN_KEY)?.value || c.get(REFRESH_TOKEN_KEY)?.value,
    );
  }

  return hasRefreshTokenHint();
};
