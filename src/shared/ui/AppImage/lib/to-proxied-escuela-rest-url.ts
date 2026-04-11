import { ESCUELA_REST_API_BASE_URL } from '../../../config/consts/escuela-rest';

/** Префикс Route Handler `src/app/api/escuela-rest/[...path]/route.ts`. */
export const ESCUELA_REST_BFF_PATHNAME = '/api/escuela-rest';

/**
 * Подменяет абсолютный URL публичного REST Escuela (`api.escuelajs.co/api/v1/…`)
 * на тот же origin (`/api/escuela-rest/…`), чтобы обойти `Cross-Origin-Resource-Policy: same-origin`
 * у upstream при отображении через `<img>`.
 */
export function toProxiedEscuelaRestUrl(src: string): string {
  if (!src || src.startsWith(ESCUELA_REST_BFF_PATHNAME)) {
    return src;
  }

  try {
    const parsed = new URL(src);
    const base = new URL(ESCUELA_REST_API_BASE_URL);
    if (parsed.origin !== base.origin) {
      return src;
    }

    const prefix = base.pathname.endsWith('/')
      ? base.pathname.slice(0, -1)
      : base.pathname;

    const path = parsed.pathname;
    if (path !== prefix && !path.startsWith(`${prefix}/`)) {
      return src;
    }

    const rest = path.startsWith(prefix) ? path.slice(prefix.length) : path;
    const normalized = rest.startsWith('/') ? rest.slice(1) : rest;
    if (!normalized) {
      return src;
    }

    return `${ESCUELA_REST_BFF_PATHNAME}/${normalized}${parsed.search}`;
  } catch {
    return src;
  }
}
