import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';

export const adminPanelHeadingPage = 'Админка';

export const addEntitiesButtonsConfig = [
  {
    href: pagesPath.products.create.$url().path,
    title: 'Добавить продукт',
    onboardingTarget: ONBOARDING_TARGET_IDS.adminPanelAddProduct,
  },
  {
    href: pagesPath.categories.create.$url().path,
    title: 'Добавить категорию',
    onboardingTarget: ONBOARDING_TARGET_IDS.adminPanelAddCategory,
  },
] as const;
