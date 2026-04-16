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

async function waitForTarget(
  selector: string,
  timeoutMs = 15000,
): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (document.querySelector(selector)) {
      return;
    }
    await delay(100);
  }
}

export function buildAdminOnboardingSteps({
  client,
  navigate,
  getPathname,
}: BuildAdminStepsParams): Step[] {
  const usersPath = pagesPath.users.$url().path;
  const adminPath = pagesPath.admin_panel.$url().path;
  const categoriesPath = pagesPath.categories.$url().path;
  const categoryCreatePath = pagesPath.categories.create.$url().path;
  const productCreatePath = pagesPath.products.create.$url().path;
  const productsPath = pagesPath.products.$url().path;
  const adminDemoProductDetailPath = pagesPath.products
    ._id(ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID)
    .$url().path;

  const routeTargets: Array<{ pathname: string | null }> = [
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
      title: `Админ: шаг ${stepIndex + 1} из ${total}`,
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
}

function AdminStepContent({ index }: { index: number }) {
  const bodies: string[] = [
    'Откройте таб «Пользователи» в боковом меню.',
    'Здесь вы можете посмотреть информацию по пользователям, зарегистрированным на платформе.',
    'Перейдите в раздел «Админка» через боковое меню.',
    'Нажмите «Добавить категорию», чтобы открыть форму создания категории.',
    'Форма заполнена демо-данными. Нажмите «Создать категорию».',
    'На этой странице можно просмотреть созданные категории.',
    'Вернитесь в админку и нажмите «Добавить продукт».',
    'Форма заполнена демо-данными товара. Нажмите «Создать товар».',
    'Нажмите на созданный товар в списке, чтобы открыть его карточку.',
    'Здесь вы можете редактировать и удалять товар.',
  ];

  return <p className="text-sm leading-relaxed">{bodies[index] ?? ''}</p>;
}
