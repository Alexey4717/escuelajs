import type { ApolloClient } from '@apollo/client-integration-nextjs';

let browserClient: ApolloClient | null = null;

export const setBrowserApolloClient = (client: ApolloClient | null): void => {
  browserClient = client;
};

export const getBrowserApolloClient = (): ApolloClient | null => browserClient;
