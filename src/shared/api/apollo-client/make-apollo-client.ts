import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { ApolloLink } from '@apollo/client/link';

import { createErrorLink } from './links/error-link';
import { createHttpLink } from './links/http-link';

export function makeApolloClient(): ApolloClient {
  const link = ApolloLink.from([createErrorLink(), createHttpLink()]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}
