import { QueryClient } from '@tanstack/react-query';

/**
 * Настройки по умолчанию для клиентского кеша (TanStack Query v5).
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/important-defaults
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /** Не дёргать сеть на каждый mount, пока данные «свежие». */
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
          if (error instanceof Error && /abort/i.test(error.name)) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
