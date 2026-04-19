import { type ReactElement } from 'react';

import { render } from '@testing-library/react';
import { Toaster } from 'sonner';

import { ApolloProvider } from '@/shared/api/apollo-client/provider';
import { QueryProvider } from '@/shared/api/query-client/query-provider';

import { ModalProvider } from '@/app/modal/ui/ModalProvider';

/**
 * Оболочка близка к корневому `app/layout.tsx`: TanStack Query, Apollo, модалки и toasts.
 * Для тестов без тёмной темы — `light`, десктоп (`initialIsMobile: false`).
 */
export const renderWithProviders = (ui: ReactElement) =>
  render(
    <QueryProvider>
      <ApolloProvider>
        <ModalProvider initialIsMobile={false}>
          {ui}
          <Toaster theme="light" />
        </ModalProvider>
      </ApolloProvider>
    </QueryProvider>,
  );
