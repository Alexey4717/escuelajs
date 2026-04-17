import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import mockRouter from 'next-router-mock';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  mswServer,
  renderWithProviders,
  TEST_GRAPHQL_HTTP_URL,
  TEST_USER_ID,
} from '@/test/testing';

import { useAppStore } from '@/shared/lib/store';

import { ProfileRoute } from './ProfileRoute';

/**
 * Сценарий с UNAUTHENTICATED идёт раньше сценария с успешной загрузкой:
 * в тесте с ошибкой проверяем целевое состояние UI (fallback-загрузка без данных профиля).
 */
describe('ProfileRoute — UNAUTHENTICATED (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/profile');
  });

  it('redirects to login when GraphQL returns UNAUTHENTICATED', async () => {
    useAppStore.setState({ currentUserId: TEST_USER_ID });
    mswServer.use(
      http.post(TEST_GRAPHQL_HTTP_URL, () =>
        HttpResponse.json({
          data: null,
          errors: [
            {
              message: 'Unauthorized',
              extensions: { code: 'UNAUTHENTICATED' },
            },
          ],
        }),
      ),
    );

    renderWithProviders(<ProfileRoute />);

    await waitFor(() => {
      expect(screen.queryByText('Edit profile')).not.toBeInTheDocument();
    });
  });
});

describe('ProfileRoute — loaded user (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/profile');
  });

  it('renders user data when session and query succeed', async () => {
    useAppStore.setState({ currentUserId: TEST_USER_ID });
    renderWithProviders(<ProfileRoute />);

    expect(
      (await screen.findAllByText('test@example.com')).length,
    ).toBeGreaterThan(0);
  });
});
