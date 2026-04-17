import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';

export const adminPanelHeadingPage = 'Admin panel';

export const addEntitiesButtonsConfig = [
  {
    href: pagesPath.products.create.$url().path,
    title: 'Add product',
    onboardingTarget: ONBOARDING_TARGET_IDS.adminPanelAddProduct,
  },
  {
    href: pagesPath.categories.create.$url().path,
    title: 'Add category',
    onboardingTarget: ONBOARDING_TARGET_IDS.adminPanelAddCategory,
  },
] as const;
