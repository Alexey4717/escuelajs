import { pagesPath } from '@/shared/routes/$path';

const DEFAULT_AFTER_LOGIN = pagesPath.profile.$url().path;

/**
 * Безопасный путь после логина из query `from` (защита от open redirect).
 * Разрешены только относительные пути приложения: `/…`, без `//`, без схемы.
 */
export function sanitizeLoginFromParam(
  raw?: string | null,
  fallback: string = DEFAULT_AFTER_LOGIN,
): string {
  if (raw == null || typeof raw !== 'string') {
    return fallback;
  }
  const t = raw.trim();
  if (!t.startsWith('/') || t.startsWith('//')) {
    return fallback;
  }
  if (t.includes(':\\') || t.includes('//')) {
    return fallback;
  }
  if (t.includes(':')) {
    return fallback;
  }
  if (t.length > 512) {
    return fallback;
  }
  return t;
}

/** URL страницы логина с параметром `from` для возврата после успешного входа. */
export function loginPageUrlWithFrom(currentPath: string): string {
  const from = sanitizeLoginFromParam(currentPath, DEFAULT_AFTER_LOGIN);
  return `${pagesPath.login.$url().path}?${new URLSearchParams({ from }).toString()}`;
}
