import { registerApolloClient } from '@apollo/client-integration-nextjs';
import 'server-only';

import { makeApolloClient } from '../client/make-apollo-client';

export const { getClient, query, PreloadQuery } = registerApolloClient(() =>
  makeApolloClient(),
);
