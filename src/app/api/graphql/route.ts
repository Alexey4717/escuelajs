/**
 * BFF-прокси GraphQL для Escuela (`GRAPHQL_URI`).
 *
 * **Зачем:** Apollo в браузере ходит на тот же origin (`/api/graphql`), чтобы с запросом
 * автоматически уходили cookie. HttpOnly-токены недоступны из JS, поэтому заголовок
 * `Authorization: Bearer …` к upstream подставляется **здесь**, из cookie запроса.
 *
 * **Мутации `login` и `refreshToken`:** ответ Escuela содержит токены в JSON. Мы
 * выставляем их в HttpOnly (и флаг `auth_has_refresh`) через `Set-Cookie`, а в теле
 * ответа клиенту **обнуляем** `access_token` / `refresh_token`, чтобы секреты не
 * попадали в кеш Apollo и в память приложения как обычные поля data.
 *
 * **Refresh:** переменная `refreshToken` в мутации может быть пустой в теле от клиента;
 * сервер подставляет значение из HttpOnly cookie `refresh_token` перед запросом к API.
 * При ошибке refresh снимаем сессионные cookie; если refresh cookie нет — отдаём
 * GraphQL-ошибку и чистим флаг-hint.
 */
import { NextRequest, NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  GRAPHQL_URI,
  REFRESH_TOKEN_KEY,
} from '@/shared/config/consts';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import {
  applyAuthCookiesToResponse,
  clearAuthCookiesOnResponse,
  clearRefreshHintOnResponse,
} from '@/shared/lib/cookies/auth-cookies';

const E2E_MOCK_GRAPHQL = process.env.E2E_MOCK_GRAPHQL === '1';

/** Парсинг тела POST как JSON для разбора операции и ответа. */
function parseJson(text: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(text) as unknown;
    return v !== null && typeof v === 'object'
      ? (v as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * Определяет мутацию refresh по `operationName` или тексту документа
 * (имя операции: `Auth_RefreshToken`, ранее встречалось `RefreshToken`).
 */
function isRefreshOperation(parsed: Record<string, unknown>): boolean {
  const op =
    typeof parsed.operationName === 'string' ? parsed.operationName : '';
  if (op === 'Auth_RefreshToken' || op === 'RefreshToken') {
    return true;
  }
  const q = typeof parsed.query === 'string' ? parsed.query : '';
  return /^\s*mutation\s+(Auth_RefreshToken|RefreshToken)\b/im.test(q);
}

/**
 * Клонирует JSON ответа и затирает токены в `data.login` / `data.refreshToken`
 * перед отправкой в браузер (после того как cookie уже выставлены).
 */
function stripTokensFromJson(json: Record<string, unknown>): string {
  const clone = JSON.parse(JSON.stringify(json)) as Record<string, unknown>;
  const data = clone.data as Record<string, unknown> | undefined;
  if (data?.login && typeof data.login === 'object') {
    const login = data.login as Record<string, unknown>;
    data.login = { ...login, access_token: '', refresh_token: '' };
  }
  if (data?.refreshToken && typeof data.refreshToken === 'object') {
    const rt = data.refreshToken as Record<string, unknown>;
    data.refreshToken = { ...rt, access_token: '', refresh_token: '' };
  }
  return JSON.stringify(clone);
}

function makeUserDetailsMockResponse(request: NextRequest): NextResponse {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const sub = getSubFromAccessToken(accessToken);
  const roleFromHeader = request.headers.get('x-e2e-user-role');
  const role =
    roleFromHeader === 'admin' || roleFromHeader === 'customer'
      ? roleFromHeader
      : sub === 'e2e-admin'
        ? 'admin'
        : 'customer';
  const userId = sub ?? 'e2e-customer';

  return NextResponse.json({
    data: {
      user: {
        id: userId,
        name: role === 'admin' ? 'E2E Admin' : 'E2E Customer',
        email:
          role === 'admin'
            ? 'e2e-admin@example.com'
            : 'e2e-customer@example.com',
        role,
        avatar: null,
        creationAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  });
}

function isUserDetailsOperation(parsed: Record<string, unknown>): boolean {
  const op =
    typeof parsed.operationName === 'string' ? parsed.operationName : '';
  if (op === 'UserDetails') {
    return true;
  }

  const q = typeof parsed.query === 'string' ? parsed.query : '';
  return /^\s*query\s+UserDetails\b/im.test(q);
}

/** Проксирует POST GraphQL к upstream и применяет логику cookie / очистки токенов в теле. */
export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const bodyText = await request.text();
  const parsed = parseJson(bodyText);
  const isE2eMockRequest =
    E2E_MOCK_GRAPHQL || request.headers.get('x-e2e-mock-graphql') === '1';

  let bodyToSend = bodyText;
  let isRefreshRequest = false;

  if (isE2eMockRequest && parsed && isUserDetailsOperation(parsed)) {
    return makeUserDetailsMockResponse(request);
  }

  if (parsed) {
    isRefreshRequest = isRefreshOperation(parsed);
    if (isRefreshRequest) {
      const rt = request.cookies.get(REFRESH_TOKEN_KEY)?.value;
      if (!rt) {
        const res = NextResponse.json(
          {
            errors: [
              {
                message: 'No refresh token',
                extensions: { code: 'UNAUTHENTICATED' },
              },
            ],
          },
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
        clearRefreshHintOnResponse(res);
        return res;
      }
      const vars =
        parsed.variables && typeof parsed.variables === 'object'
          ? (parsed.variables as Record<string, unknown>)
          : {};
      parsed.variables = { ...vars, refreshToken: rt };
      bodyToSend = JSON.stringify(parsed);
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let upstream: Response;
  try {
    upstream = await fetch(GRAPHQL_URI, {
      method: 'POST',
      headers,
      body: bodyToSend,
    });
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : 'Upstream fetch failed';
    return NextResponse.json(
      {
        errors: [
          {
            message: `GraphQL upstream unreachable: ${message}`,
            extensions: { code: 'UPSTREAM_UNAVAILABLE' },
          },
        ],
      },
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const resBody = await upstream.text();
  const json = parseJson(resBody);

  if (!json) {
    return new NextResponse(resBody, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') ?? 'application/json',
      },
    });
  }

  if (
    Array.isArray(json.errors) &&
    json.errors.length > 0 &&
    isRefreshRequest
  ) {
    const res = new NextResponse(resBody, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') ?? 'application/json',
      },
    });
    clearAuthCookiesOnResponse(res);
    return res;
  }

  const data = json.data as Record<string, unknown> | undefined;

  if (data?.login && typeof data.login === 'object') {
    const login = data.login as {
      access_token?: string;
      refresh_token?: string;
    };
    if (login.access_token && login.refresh_token) {
      const response = new NextResponse(stripTokensFromJson(json), {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' },
      });
      applyAuthCookiesToResponse(
        response,
        login.access_token,
        login.refresh_token,
      );
      return response;
    }
  }

  if (data?.refreshToken && typeof data.refreshToken === 'object') {
    const rt = data.refreshToken as {
      access_token?: string;
      refresh_token?: string;
    };
    if (rt.access_token && rt.refresh_token) {
      const response = new NextResponse(stripTokensFromJson(json), {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' },
      });
      applyAuthCookiesToResponse(response, rt.access_token, rt.refresh_token);
      return response;
    }
  }

  return new NextResponse(resBody, {
    status: upstream.status,
    headers: {
      'Content-Type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}
