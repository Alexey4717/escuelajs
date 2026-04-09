import { expect, test } from '@playwright/test';

import { createUnsignedJwtWithSub } from '../src/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';

test.describe('Защита admin-panel', () => {
  test('пользователь без роли admin перенаправляется на /forbidden', async ({
    context,
    page,
    baseURL,
  }) => {
    await context.setExtraHTTPHeaders({
      'x-e2e-mock-graphql': '1',
      'x-e2e-user-role': 'customer',
    });

    await context.addCookies([
      {
        name: 'access_token',
        value: createUnsignedJwtWithSub('e2e-customer'),
        url: baseURL,
      },
    ]);

    await page.goto('/admin-panel', { waitUntil: 'commit' });

    await expect(page).toHaveURL(/\/forbidden$/);
    await expect(
      page.getByRole('heading', { name: 'Доступ запрещен' }),
    ).toBeVisible();
  });

  test('админ имеет доступ к /admin-panel', async ({
    context,
    page,
    baseURL,
  }) => {
    await context.setExtraHTTPHeaders({
      'x-e2e-mock-graphql': '1',
      'x-e2e-user-role': 'admin',
    });

    await context.addCookies([
      {
        name: 'access_token',
        value: createUnsignedJwtWithSub('e2e-admin'),
        url: baseURL,
      },
    ]);

    await page.goto('/admin-panel', { waitUntil: 'commit' });

    await expect(page).toHaveURL(/\/admin-panel$/);
    await expect(page.getByRole('heading', { name: 'Админка' })).toBeVisible();
  });
});
