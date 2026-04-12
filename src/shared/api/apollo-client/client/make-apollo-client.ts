import { disableFragmentWarnings } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { ApolloLink } from '@apollo/client/link';

import {
  arraysPoliciesByCursorLimit,
  arraysPoliciesByOffsetLimit,
  nonNormalizedArrayQueryFields,
  nonNormalizedQueryFields,
  queryListFieldsWithKeyArgs,
  typePoliciesByType,
} from '../../generated/apolloCachePolicies';
import { createErrorLink } from '../links/error-link';
import { createHttpLink } from '../links/http-link';

export function makeApolloClient(): ApolloClient {
  disableFragmentWarnings();

  const link = ApolloLink.from([createErrorLink(), createHttpLink()]);

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            ...nonNormalizedArrayQueryFields,
            ...arraysPoliciesByOffsetLimit,
            ...arraysPoliciesByCursorLimit,
            ...queryListFieldsWithKeyArgs,
            ...nonNormalizedQueryFields,
          },
        },
        ...typePoliciesByType,
      },
    }),
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}
