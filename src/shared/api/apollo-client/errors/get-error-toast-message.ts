import {
  CombinedGraphQLErrors,
  ServerError,
  ServerParseError,
} from '@apollo/client/errors';

import { isUnauthorized } from '../auth/is-unauthorized';

const MSG_CLIENT_ERROR = 'Something went wrong';
const MSG_SERVER_ERROR = 'Internal server error';

const getHttpStatusCode = (error: unknown): number | undefined => {
  if (ServerError.is(error) || ServerParseError.is(error)) {
    return error.statusCode;
  }
  return undefined;
};

const hasGraphQlInternalServerError = (error: CombinedGraphQLErrors): boolean =>
  error.errors.some((e) => e.extensions?.code === 'INTERNAL_SERVER_ERROR');

/** Сообщение для toast или `null`, если тост показывать не нужно. */
export const getErrorToastMessage = (error: unknown): string | null => {
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
    if (hasGraphQlInternalServerError(error)) {
      return MSG_SERVER_ERROR;
    }
    return MSG_CLIENT_ERROR;
  }

  return null;
};
