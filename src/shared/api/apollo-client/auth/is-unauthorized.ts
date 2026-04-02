import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';

function isGraphQlUnauthorizedMessage(error: {
  message?: string;
  extensions?: { code?: unknown };
}): boolean {
  const code = error.extensions?.code;
  if (code === 'UNAUTHENTICATED') {
    return true;
  }
  const msg = (error.message ?? '').toLowerCase();
  return msg.includes('unauthorized');
}

export function isUnauthorized(error: unknown): boolean {
  if (ServerError.is(error) && error.statusCode === 401) {
    return true;
  }
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some(isGraphQlUnauthorizedMessage);
  }
  if (error instanceof Error) {
    return isGraphQlUnauthorizedMessage({ message: error.message });
  }
  return false;
}
