import { screen, waitFor } from '@testing-library/react';
import { graphql, HttpResponse } from 'msw';
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

const gql = graphql.link(TEST_GRAPHQL_HTTP_URL);

/**
 * Сценарий с UNAUTHENTICATED идёт раньше сценария с успешной загрузкой: после теста,
 * где `UserDetails` отдаёт данные, кеш Apollo в связке с MSW в следующем `it` может
 * приводить к повторному использованию успешного результата вместо ответа из
 * `mswServer.use` (отдельный файл раньше давал «чистый» прогон без предшествующего успеха).
 * Порядок describe/`it` здесь важен; альтернатива — вынести UNAUTHENTICATED в отдельный `*.test.tsx`.
 */
describe('ProfileRoute — UNAUTHENTICATED (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/profile');
  });

  it('shows redirect copy when GraphQL returns UNAUTHENTICATED', async () => {
    useAppStore.setState({ currentUserId: TEST_USER_ID });
    mswServer.use(
      gql.query('UserDetails', () =>
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
      expect(screen.getByText(/Перенаправление на вход/)).toBeInTheDocument();
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
      await screen.findByRole('heading', { name: 'Профиль' }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('test@example.com').length,
    ).toBeGreaterThanOrEqual(1);
  });
});
