import { Buffer } from 'node:buffer';

/**
 * Достаёт `sub` из payload JWT без проверки подписи (достаточно для id запроса `user(id)`;
 */
export function getSubFromAccessToken(
  accessToken: string | undefined,
): string | null {
  if (!accessToken?.trim()) {
    return null;
  }
  const parts = accessToken.split('.');
  if (parts.length !== 3 || !parts[1]) {
    return null;
  }
  try {
    const json = base64UrlToUtf8(parts[1]);
    const payload = JSON.parse(json) as { sub?: unknown };
    const sub = payload.sub;
    if (sub == null) {
      return null;
    }
    return String(sub);
  } catch {
    return null;
  }
}

/**
 * Тестовый helper: генерирует «JWT-подобный» токен без подписи.
 * Подходит для e2e/интеграционных тестов, где важен только payload.sub.
 */
export function createUnsignedJwtWithSub(sub: string): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'none', typ: 'JWT' }),
  ).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ sub })).toString('base64url');
  return `${header}.${payload}.signature`;
}

function base64UrlToUtf8(segment: string): string {
  const padding = '='.repeat((4 - (segment.length % 4)) % 4);
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/') + padding;
  return Buffer.from(base64, 'base64').toString('utf8');
}
