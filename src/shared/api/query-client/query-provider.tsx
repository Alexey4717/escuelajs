'use client';

import { type PropsWithChildren } from 'react';

import dynamic from 'next/dynamic';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from './get-query-client';

const isDev = process.env.NODE_ENV === 'development';

const ReactQueryDevtools = isDev
  ? dynamic(
      () =>
        import('@tanstack/react-query-devtools').then(
          (mod) => mod.ReactQueryDevtools,
        ),
      { ssr: false },
    )
  : () => null;

export function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev ? (
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
      ) : null}
    </QueryClientProvider>
  );
}
