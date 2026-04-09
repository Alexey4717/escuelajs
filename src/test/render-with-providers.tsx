import { type ReactElement } from 'react';

import { render } from '@testing-library/react';
import { Toaster } from 'sonner';

import { ApolloProvider } from '@/shared/api/apollo-client/provider';

import { ModalProvider } from '@/app/modal/ui/ModalProvider';

/**
 * Оболочка близка к корневому `app/layout.tsx`: Apollo, модалки и toasts.
 * Для тестов без тёмной темы — `light`, десктоп (`initialIsMobile: false`).
 */
export function renderWithProviders(ui: ReactElement) {
  return render(
    <ApolloProvider>
      <ModalProvider initialIsMobile={false}>
        {ui}
        <Toaster theme="light" />
      </ModalProvider>
    </ApolloProvider>,
  );
}
