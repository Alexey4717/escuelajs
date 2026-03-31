/**
 * Сроки жизни cookie (`max-age` в секундах). Разные сущности — разные TTL:
 * сессия короче по соображениям безопасности, тема UI — дольше как предпочтение.
 */

const HOUR = 60 * 60;
const DAY = HOUR * 24;

/** Access token: короткий срок уменьшает окно при утечке. */
export const AUTH_ACCESS_MAX_AGE_SECONDS = DAY;

/** Refresh и флаг `auth_has_refresh`: дольше access, согласованы между собой. */
export const AUTH_REFRESH_MAX_AGE_SECONDS = DAY * 14;

/** Cookie `theme`: не секрет, держим год для стабильного UX между визитами. */
export const THEME_COOKIE_MAX_AGE_SECONDS = DAY * 365;
