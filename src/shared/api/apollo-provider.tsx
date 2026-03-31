'use client';

import { type PropsWithChildren, useEffect, useMemo } from 'react';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';

import { setBrowserApolloClient } from './apollo-client/browser-apollo-client';
import { makeApolloClient } from './apollo-client/make-apollo-client';

export function ApolloProvider({ children }: PropsWithChildren) {
  const client = useMemo(() => makeApolloClient(), []);

  useEffect(() => {
    if (!client) return;
    if (typeof window !== 'undefined') {
      setBrowserApolloClient(client);
    }
    return () => setBrowserApolloClient(null);
  }, [client]);

  return <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>;
}
