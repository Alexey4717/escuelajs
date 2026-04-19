/**
 * Временная отладка сессии (session 0b4758): JSON в stdout + ingest для локального режима.
 * Не логировать секреты — только флаги, длины, имена операций.
 */
const DEBUG_SESSION_ID = '0b4758';

const INGEST_URL =
  'http://127.0.0.1:7578/ingest/881f0ceb-afd8-4a89-8d54-c3baf223b78b';

export interface DebugSessionPayload {
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
}

export const emitDebugSessionLog = (payload: DebugSessionPayload): void => {
  const body = {
    sessionId: DEBUG_SESSION_ID,
    timestamp: Date.now(),
    ...payload,
  };
  const line = JSON.stringify(body);
  console.log(`[debug-${DEBUG_SESSION_ID}]`, line);
  // #region agent log
  fetch(INGEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': DEBUG_SESSION_ID,
    },
    body: line,
  }).catch(() => {});
  // #endregion
};
