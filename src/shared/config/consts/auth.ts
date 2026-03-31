/** Имена HttpOnly cookie (совпадают с ключами Escuela в JSON). */
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Не HttpOnly: только флаг «на сервере может быть refresh».
 * Нужен, чтобы не слать POST /api/auth/refresh без чтения HttpOnly из JS.
 */
export const REFRESH_HINT_COOKIE = 'auth_has_refresh';

/** Контекст операции: повтор после refresh уже выполнялся. */
export const RETRY_UNAUTHORIZED_KEY = 'retryUnauthorized';
