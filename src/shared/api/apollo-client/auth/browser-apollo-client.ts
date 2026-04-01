import type { ApolloClient } from '@apollo/client-integration-nextjs';

let browserClient: ApolloClient | null = null;

export function setBrowserApolloClient(client: ApolloClient | null): void {
  browserClient = client;
}

export function getBrowserApolloClient(): ApolloClient | null {
  return browserClient;
}
