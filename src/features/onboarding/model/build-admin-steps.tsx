import { type ApolloClient } from '@apollo/client';
import { type Step } from 'react-joyride';

import { pagesPath } from '@/shared/config/routes/$path';
import {
  ONBOARDING_TARGET_IDS,
  onboardingSelector,
} from '@/shared/lib/onboarding';

import { applyOnboardingAdminPreset } from '../lib/apply-onboarding-preset';
import { type OnboardingStepAdvanceMode } from '../lib/onboarding-step-behavior';
import { delay } from '../lib/utils/delay';

interface BuildAdminStepsParams {
  client: ApolloClient;
  navigate: (path: string) => void;
  getPathname: () => string;
}

const ADMIN_TARGETS = [
  ONBOARDING_TARGET_IDS.sidebarNavUsers,
  ONBOARDING_TARGET_IDS.sidebarNavAdmin,
  ONBOARDING_TARGET_IDS.adminPanelGrid,
  ONBOARDING_TARGET_IDS.usersTable,
] as const;

export function buildAdminOnboardingSteps({
  client,
  navigate,
  getPathname,
}: BuildAdminStepsParams): Step[] {
  const usersPath = pagesPath.users.$url().path;
  const adminPath = pagesPath.admin_panel.$url().path;

  const routeTargets: Array<{ pathname: string | null }> = [
    { pathname: usersPath },
    { pathname: adminPath },
    { pathname: adminPath },
    { pathname: usersPath },
  ];
  const advanceModes: OnboardingStepAdvanceMode[] = [
    'targetClick',
    'targetClick',
    'tooltipNext',
    'tooltipLast',
  ];

  const total = ADMIN_TARGETS.length;

  return ADMIN_TARGETS.map((tid, stepIndex) => {
    const m = routeTargets[stepIndex];
    return {
      target: onboardingSelector(tid),
      title: `Админ: шаг ${stepIndex + 1} из ${total}`,
      content: <AdminStepContent index={stepIndex} />,
      placement: 'bottom' as const,
      disableBeacon: true,
      showBeacon: false,
      data: {
        advanceMode: advanceModes[stepIndex],
      },
      before: async () => {
        applyOnboardingAdminPreset(client, stepIndex);
        const targetPath = m.pathname;
        if (targetPath && getPathname() !== targetPath) {
          navigate(targetPath);
          await delay(450);
        }
      },
    };
  });
}

function AdminStepContent({ index }: { index: number }) {
  const bodies: string[] = [
    'Просмотр списка пользователей: роли, поиск по данным.',
    'Панель администратора — быстрые переходы к созданию сущностей.',
    'Создайте категорию или продукт из панели (в демо используются тестовые данные).',
    'Вернитесь к списку пользователей при необходимости.',
  ];

  return <p className="text-sm leading-relaxed">{bodies[index] ?? ''}</p>;
}
