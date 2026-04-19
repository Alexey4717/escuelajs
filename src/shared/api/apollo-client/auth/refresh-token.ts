import { RefreshTokenDocument } from '@/shared/api/generated/graphql';
import { hasRefreshTokenHint } from '@/shared/lib/auth/auth-refresh-hint.client';

import { getBrowserApolloClient } from './browser-apollo-client';

let refreshInFlight: Promise<boolean> | null = null;

const refreshSession = async (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!hasRefreshTokenHint()) {
    return false;
  }

  const client = getBrowserApolloClient();
  if (!client) {
    return false;
  }

  // Схема требует `refreshToken`, но HttpOnly cookie недоступны из JS — реальное значение
  // подставляет BFF (`POST /api/graphql`) из cookie `refresh_token` перед запросом к API.
  const result = await client.mutate({
    mutation: RefreshTokenDocument,
    variables: { refreshToken: '' },
  });

  if (result.error) {
    return false;
  }

  return !!result.data;
};

export const refreshTokensOnce = (): Promise<boolean> => {
  if (!refreshInFlight) {
    refreshInFlight = refreshSession().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};
