import { type ApolloClient } from '@apollo/client';
import { type Step } from 'react-joyride';

import { pagesPath } from '@/shared/config/routes/$path';
import {
  ONBOARDING_TARGET_IDS,
  onboardingSelector,
} from '@/shared/lib/onboarding';

import { applyOnboardingAdminPreset } from '../lib/apply-onboarding-preset';
import { ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID } from '../lib/onboarding-demo-fixtures';
import { type OnboardingStepAdvanceMode } from '../lib/onboarding-step-behavior';
import { delay } from '../lib/utils/delay';

interface BuildAdminStepsParams {
  client: ApolloClient;
  navigate: (path: string) => void;
  getPathname: () => string;
}

const ADMIN_TARGETS = [
  onboardingSelector(ONBOARDING_TARGET_IDS.sidebarNavUsers),
  onboardingSelector(ONBOARDING_TARGET_IDS.usersTable),
  onboardingSelector(ONBOARDING_TARGET_IDS.sidebarNavAdmin),
  onboardingSelector(ONBOARDING_TARGET_IDS.adminPanelAddCategory),
  onboardingSelector(ONBOARDING_TARGET_IDS.categoryCreateSubmitButton),
  onboardingSelector(ONBOARDING_TARGET_IDS.categoriesList),
  onboardingSelector(ONBOARDING_TARGET_IDS.adminPanelAddProduct),
  onboardingSelector(ONBOARDING_TARGET_IDS.productCreateSubmitButton),
  onboardingSelector(ONBOARDING_TARGET_IDS.productsListAdminDemoProductLink),
  onboardingSelector(ONBOARDING_TARGET_IDS.productDetailAdminActions),
] as const;

const waitForTarget = async (
  selector: string,
  timeoutMs = 15000,
): Promise<void> => {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (document.querySelector(selector)) {
      return;
    }
    await delay(100);
  }
};

export const buildAdminOnboardingSteps = ({
  client,
  navigate,
  getPathname,
}: BuildAdminStepsParams): Step[] => {
  const usersPath = pagesPath.users.$url().path;
  const adminPath = pagesPath.admin_panel.$url().path;
  const categoriesPath = pagesPath.categories.$url().path;
  const categoryCreatePath = pagesPath.categories.create.$url().path;
  const productCreatePath = pagesPath.products.create.$url().path;
  const productsPath = pagesPath.products.$url().path;
  const adminDemoProductDetailPath = pagesPath.products
    ._id(ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID)
    .$url().path;

  const routeTargets: Array<{
    pathname: string | null;
  }> = [
    { pathname: null },
    { pathname: usersPath },
    { pathname: null },
    { pathname: adminPath },
    { pathname: categoryCreatePath },
    { pathname: categoriesPath },
    { pathname: adminPath },
    { pathname: productCreatePath },
    { pathname: productsPath },
    { pathname: adminDemoProductDetailPath },
  ];
  const advanceModes: OnboardingStepAdvanceMode[] = [
    'targetClick',
    'tooltipNext',
    'targetClick',
    'targetClick',
    'targetClick',
    'tooltipNext',
    'targetClick',
    'targetClick',
    'targetClick',
    'tooltipLast',
  ];

  const total = ADMIN_TARGETS.length;

  return ADMIN_TARGETS.map((target, stepIndex) => {
    const m = routeTargets[stepIndex];
    return {
      target,
      title: `Admin: step ${stepIndex + 1} of ${total}`,
      content: <AdminStepContent index={stepIndex} />,
      placement: 'bottom' as const,
      disableBeacon: true,
      showBeacon: false,
      data: {
        advanceMode: advanceModes[stepIndex],
      },
      blockTargetInteraction:
        advanceModes[stepIndex] === 'tooltipNext' ||
        advanceModes[stepIndex] === 'tooltipLast',
      before: async () => {
        applyOnboardingAdminPreset(client, stepIndex);
        const targetPath = m.pathname;
        if (targetPath && getPathname() !== targetPath) {
          navigate(targetPath);
          await delay(450);
        }
        await waitForTarget(target);
      },
    };
  });
};

const AdminStepContent = ({ index }: { index: number }) => {
  const bodies: string[] = [
    'Open the “Users” tab in the sidebar.',
    'Here you can review information about registered users.',
    'Go to the “Admin panel” section from the sidebar.',
    'Click “Add category” to open category creation form.',
    'The form is prefilled with demo data. Click “Create category”.',
    'This page shows created categories.',
    'Go back to admin panel and click “Add product”.',
    'The form is prefilled with demo data. Click “Create product”.',
    'Click the created product in the list to open its details.',
    'Here you can edit and delete the product.',
  ];

  return <p className="text-sm leading-relaxed">{bodies[index] ?? ''}</p>;
};
