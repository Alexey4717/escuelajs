import { REFRESH_HINT_COOKIE } from '../../config/consts/auth';

/** Есть ли на клиенте флаг сессии (не секрет; HttpOnly refresh так не виден). */
export function hasRefreshTokenHint(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  const prefix = `${REFRESH_HINT_COOKIE}=`;
  return document.cookie.split(';').some((c) => c.trim().startsWith(prefix));
}
