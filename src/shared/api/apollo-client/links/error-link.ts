import { ErrorLink } from '@apollo/client/link/error';
import { from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RETRY_UNAUTHORIZED_KEY } from '../../../config/consts/auth';
import { isUnauthorized } from '../is-unauthorized';
import { refreshTokensOnce } from '../refresh-token';

export function createErrorLink(): ErrorLink {
  return new ErrorLink(({ error, operation, forward }) => {
    if (operation.getContext()[RETRY_UNAUTHORIZED_KEY]) {
      return;
    }

    if (!isUnauthorized(error)) {
      return;
    }

    if (typeof window === 'undefined') {
      return throwError(() => error);
    }

    return from(refreshTokensOnce()).pipe(
      mergeMap((ok) => {
        if (!ok) {
          return throwError(() => error);
        }

        operation.setContext({
          [RETRY_UNAUTHORIZED_KEY]: true,
        });

        return forward(operation);
      }),
    );
  });
}
