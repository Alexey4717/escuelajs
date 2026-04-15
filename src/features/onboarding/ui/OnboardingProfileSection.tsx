'use client';

import {
  ADMIN_SCENARIO_STEP_COUNT,
  GUEST_SCENARIO_STEP_COUNT,
} from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';
import { Progress } from '@/shared/ui/Progress/Progress';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUserRole } from '@/entities/Session';

import { useOnboardingProgressStore } from '../model/onboarding-progress-store';
import { useOnboardingTourOptional } from '../model/onboarding-tour-context';

const GUEST_LABELS = [
  'Меню «Продукты»',
  'Фильтры',
  'Корзина из списка',
  'Карточка второго товара',
  'Корзина на странице товара',
  'Иконка корзины',
  'Кнопка «Выбрать на карте»',
  'Пункт выдачи на карте',
  'Форма связи',
];

const ADMIN_LABELS = [
  'Пользователи',
  'Админка',
  'Панель действий',
  'Таблица пользователей',
];

export function OnboardingProfileSection() {
  const { role, loading } = useCurrentUserRole();
  const tour = useOnboardingTourOptional();
  const { startTour, run, isDemoActive } = tour ?? {
    startTour: () => {},
    run: false,
    isDemoActive: false,
  };
  const guest = useOnboardingProgressStore((s) => s.guest);
  const admin = useOnboardingProgressStore((s) => s.admin);
  const resetFlow = useOnboardingProgressStore((s) => s.resetFlow);

  if (loading) {
    return null;
  }

  const guestPct = Math.min(
    100,
    Math.round(
      (guest.completedStepIndices.length / GUEST_SCENARIO_STEP_COUNT) * 100,
    ),
  );
  const adminPct = Math.min(
    100,
    Math.round(
      (admin.completedStepIndices.length / ADMIN_SCENARIO_STEP_COUNT) * 100,
    ),
  );

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      {role !== 'admin' ? (
        <div className="space-y-3">
          <Typography variant="h5" component="h2">
            Обучение магазину
          </Typography>
          <Typography variant="muted" className="text-sm">
            Прогресс сохраняется в браузере по шагам.
          </Typography>
          <Progress value={guestPct} className="h-1.5" />
          <ul className="space-y-1">
            {GUEST_LABELS.map((label, i) => (
              <li key={label} className="flex items-center gap-2 text-sm">
                <span
                  className={
                    guest.completedStepIndices.includes(i)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground'
                  }
                >
                  {guest.completedStepIndices.includes(i) ? '✓' : '○'}
                </span>
                <button
                  type="button"
                  className="text-left underline-offset-2 hover:underline"
                  disabled={!tour || isDemoActive || run}
                  onClick={() => startTour('guest', i)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!tour || isDemoActive || run}
            onClick={() => {
              resetFlow('guest');
              startTour('guest', 0);
            }}
          >
            {guest.completedStepIndices.length > 0
              ? 'Повторить обучение'
              : 'Начать обучение'}
          </Button>
        </div>
      ) : null}

      {role === 'admin' ? (
        <div className="space-y-3">
          <Typography variant="h5" component="h2">
            Обучение администратора
          </Typography>
          <Progress value={adminPct} className="h-1.5" />
          <ul className="space-y-1">
            {ADMIN_LABELS.map((label, i) => (
              <li key={label} className="flex items-center gap-2 text-sm">
                <span
                  className={
                    admin.completedStepIndices.includes(i)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground'
                  }
                >
                  {admin.completedStepIndices.includes(i) ? '✓' : '○'}
                </span>
                <button
                  type="button"
                  className="text-left underline-offset-2 hover:underline"
                  disabled={!tour || isDemoActive || run}
                  onClick={() => startTour('admin', i)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!tour || isDemoActive || run}
            onClick={() => {
              resetFlow('admin');
              startTour('admin', 0);
            }}
          >
            {admin.completedStepIndices.length > 0
              ? 'Повторить обучение'
              : 'Начать обучение'}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
