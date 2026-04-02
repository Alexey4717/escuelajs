import { ErrorLink } from '@apollo/client/link/error';
import { from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { toast } from 'sonner';

import { RETRY_UNAUTHORIZED_KEY } from '../../../config/consts/auth';
import { isUnauthorized } from '../auth/is-unauthorized';
import { refreshTokensOnce } from '../auth/refresh-token';
import { SKIP_ERROR_TOAST_KEY } from '../context/context-keys';
import { getErrorToastMessage } from '../errors/get-error-toast-message';

export function createErrorLink(): ErrorLink {
  return new ErrorLink(({ error, operation, forward }) => {
    const context = operation.getContext();

    if (context[RETRY_UNAUTHORIZED_KEY]) {
      return;
    }

    if (typeof window !== 'undefined' && !context[SKIP_ERROR_TOAST_KEY]) {
      const toastMessage = getErrorToastMessage(error);
      if (toastMessage) {
        const opName = operation.operationName ?? 'unknown';
        toast.error(toastMessage, { id: `apollo-error:${opName}` });
      }
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
