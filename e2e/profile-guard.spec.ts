import { expect, test } from '@playwright/test';

test.describe('Защита профиля', () => {
  test('неавторизованный пользователь перенаправляется на /login с from=/profile', async ({
    page,
  }) => {
    await page.goto('/profile', { waitUntil: 'commit' });

    await expect(page).toHaveURL(/\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get('from')).toBe('/profile');
  });
});
