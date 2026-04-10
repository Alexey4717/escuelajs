import { ESCUELA_REST_API_BASE_URL } from '@/shared/config/consts/escuela-rest';

export class EscuelaRestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = 'EscuelaRestError';
  }
}

function joinUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${ESCUELA_REST_API_BASE_URL}${normalized}`;
}

/**
 * `fetch` к публичному REST Escuela с JSON по умолчанию.
 * Для авторизованных эндпоинтов передайте `Authorization` в `init.headers`.
 */
export async function fetchEscuelaRest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const { headers: initHeaders, ...rest } = init ?? {};
  const headers = new Headers(initHeaders);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const hasBody = rest.body !== undefined && rest.body !== null;
  const isFormDataBody =
    typeof FormData !== 'undefined' && rest.body instanceof FormData;

  if (hasBody && !isFormDataBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(joinUrl(path), {
    ...rest,
    headers,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const asJson = contentType.includes('application/json');

  if (!res.ok) {
    let body: unknown;
    try {
      body = asJson ? await res.json() : await res.text();
    } catch {
      body = null;
    }
    throw new EscuelaRestError(
      `Escuela REST ${res.status} ${res.statusText}`,
      res.status,
      body,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  if (!text) {
    return undefined as T;
  }

  return (asJson ? JSON.parse(text) : text) as T;
}
