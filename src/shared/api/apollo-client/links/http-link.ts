import { HttpLink } from '@apollo/client/link/http';

import { INTERNAL_GRAPHQL_PATH } from '../../../config/consts/escuela-graphql';
import { getAppOrigin } from '../../../lib/app-origin';

const graphqlEndpoint = (): string =>
  `${getAppOrigin()}${INTERNAL_GRAPHQL_PATH}`;

export const createHttpLink = (): HttpLink =>
  new HttpLink({
    uri: graphqlEndpoint(),
    fetch: async (uri, options) => {
      if (typeof window === 'undefined') {
        const { headers } = await import('next/headers');
        const h = await headers();
        const cookie = h.get('cookie') ?? '';
        return fetch(uri, {
          ...options,
          headers: {
            ...(options?.headers as Record<string, string>),
            ...(cookie ? { cookie } : {}),
          },
        });
      }
      return fetch(uri, {
        ...options,
        credentials: 'include',
      });
    },
  });
