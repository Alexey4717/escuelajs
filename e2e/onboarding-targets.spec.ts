import { expect, test } from '@playwright/test';

import { ONBOARDING_TARGET_IDS } from '../src/shared/lib/onboarding';

test.describe('onboarding DOM targets', () => {
  test('главная: форма связи с data-onboarding', async ({ page }) => {
    await page.goto('/');
    const form = page.locator(
      `[data-onboarding="${ONBOARDING_TARGET_IDS.homeContactForm}"]`,
    );
    await expect(form).toBeVisible();
  });

  test('сайдбар: ссылка на продукты', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator(
        `[data-onboarding="${ONBOARDING_TARGET_IDS.sidebarNavProducts}"]`,
      ),
    ).toBeVisible();
  });
});
