/**
 * Утилиты для выставления и сброса cookie сессии на **ответе** Route Handler / middleware.
 *
 * **HttpOnly** (`access_token`, `refresh_token`) — недоступны из `document.cookie` и JS;
 * BFF `/api/graphql` читает их на сервере и подставляет `Authorization` к upstream.
 *
 * **`auth_has_refresh`** — не секрет, не HttpOnly: флаг «на сервере может быть refresh»,
 * чтобы на клиенте не дергать мутацию refresh без необходимости (см. `auth-refresh-hint.client`).
 *
 * Имена ключей и сроки жизни — `@/shared/config/consts` (`auth`, `cookie-max-age`).
 */
import type { NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY, REFRESH_HINT_COOKIE, REFRESH_TOKEN_KEY } from '../../config/consts/auth';
import {
  AUTH_ACCESS_MAX_AGE_SECONDS,
  AUTH_REFRESH_MAX_AGE_SECONDS,
} from '../../config/consts/cookie-max-age';

/** Общие опции для токенов: XSS-сложнее прочитать, `SameSite=lax`, весь сайт по `path`. */
function getAuthCookieBase() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}

/** Опции для читаемого флага (без HttpOnly), иначе JS не увидит hint. */
function getReadableCookieBase() {
  return {
    httpOnly: false as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}

/**
 * После успешного `login` / `refreshToken` в BFF: записать пару токенов в HttpOnly
 * и выставить флаг `auth_has_refresh` с тем же maxAge, что и refresh.
 */
export function applyAuthCookiesToResponse(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
): void {
  const base = getAuthCookieBase();
  response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...base,
    maxAge: AUTH_ACCESS_MAX_AGE_SECONDS,
  });
  response.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...base,
    maxAge: AUTH_REFRESH_MAX_AGE_SECONDS,
  });
  response.cookies.set(REFRESH_HINT_COOKIE, '1', {
    ...getReadableCookieBase(),
    maxAge: AUTH_REFRESH_MAX_AGE_SECONDS,
  });
}

/**
 * Полный выход: удалить access, refresh и hint (например после невалидного refresh,
 * logout server action).
 */
export function clearAuthCookiesOnResponse(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_KEY);
  response.cookies.delete(REFRESH_TOKEN_KEY);
  response.cookies.delete(REFRESH_HINT_COOKIE);
}

/**
 * Только снять флаг-hint: refresh cookie уже нет, а клиент ещё думает, что сессия
 * обновляемая (например ответ BFF «No refresh token» без полного logout).
 */
export function clearRefreshHintOnResponse(response: NextResponse): void {
  response.cookies.delete(REFRESH_HINT_COOKIE);
}
