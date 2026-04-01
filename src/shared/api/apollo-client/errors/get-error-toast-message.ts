import {
  CombinedGraphQLErrors,
  ServerError,
  ServerParseError,
} from '@apollo/client/errors';

import { isUnauthorized } from '../auth/is-unauthorized';

const MSG_CLIENT_ERROR = 'Что-то пошло не так';
const MSG_SERVER_ERROR = 'Внутренняя ошибка сервера';

function getHttpStatusCode(error: unknown): number | undefined {
  if (ServerError.is(error) || ServerParseError.is(error)) {
    return error.statusCode;
  }
  return undefined;
}

/** Сообщение для toast или `null`, если тост показывать не нужно. */
export function getErrorToastMessage(error: unknown): string | null {
  if (isUnauthorized(error)) {
    return null;
  }

  const status = getHttpStatusCode(error);
  if (status !== undefined) {
    if (status >= 500 && status <= 599) {
      return MSG_SERVER_ERROR;
    }
    if (status >= 400 && status <= 499) {
      return MSG_CLIENT_ERROR;
    }
    return null;
  }

  if (CombinedGraphQLErrors.is(error)) {
    return MSG_CLIENT_ERROR;
  }

  return null;
}
