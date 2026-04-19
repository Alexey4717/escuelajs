import { type ReactElement, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';

import { makeQueryClient } from '@/shared/api/query-client/make-query-client';

export const createTestQueryClient = (): QueryClient => {
  const client = makeQueryClient();
  client.setDefaultOptions({
    queries: { retry: false },
    mutations: { retry: false },
  });
  return client;
};

type RenderWithQueryClientOptions = Omit<RenderOptions, 'wrapper'> & {
  queryClient?: QueryClient;
};

const renderOptionsWithoutQueryClient = (
  options?: RenderWithQueryClientOptions,
): Omit<RenderOptions, 'wrapper'> => {
  if (!options) {
    return {};
  }
  const rest = { ...options };
  delete rest.queryClient;
  return rest;
};

export const renderWithQueryClient = (
  ui: ReactElement,
  options?: RenderWithQueryClientOptions,
) => {
  const queryClient = options?.queryClient ?? createTestQueryClient();
  const renderOptions = renderOptionsWithoutQueryClient(options);

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
};
