import { expect, test } from '@playwright/test';

import { pagesPath } from '../src/shared/config/routes/$path';
import { createUnsignedJwtWithSub } from '../src/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';

const protectedAdminRoutes = [
  {
    name: 'categories create',
    path: pagesPath.categories.create.$url().path,
  },
  {
    name: 'categories edit',
    path: pagesPath.categories._id('e2e-category-id').edit.$url().path,
  },
  {
    name: 'products create',
    path: pagesPath.products.create.$url().path,
  },
  {
    name: 'products edit',
    path: pagesPath.products._id('e2e-product-id').edit.$url().path,
  },
] as const;

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
      page.getByRole('heading', { name: 'Access denied' }),
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
    await expect(
      page.getByRole('heading', { name: 'Admin panel' }),
    ).toBeVisible();
  });

  test.describe('защита management-роутов', () => {
    test.describe('для пользователя без роли admin', () => {
      for (const route of protectedAdminRoutes) {
        test(`перенаправляет на /forbidden: ${route.name}`, async ({
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

          await page.goto(route.path, { waitUntil: 'commit' });

          await expect(page).toHaveURL(pagesPath.forbidden.$url().path);
          await expect(
            page.getByRole('heading', { name: 'Access denied' }),
          ).toBeVisible();
        });
      }
    });

    test.describe('для администратора', () => {
      for (const route of protectedAdminRoutes) {
        test(`разрешает доступ: ${route.name}`, async ({
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

          await page.goto(route.path, { waitUntil: 'commit' });

          await expect(page).toHaveURL(route.path);
        });
      }
    });
  });
});
