'use client';

import Link from 'next/link';

import { X } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { GUEST_SCENARIO_STEP_COUNT } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUserRole } from '@/entities/Session';

import { useOnboardingProgressStore } from '../model/onboarding-progress-store';
import { useOnboardingSessionStore } from '../model/onboarding-session-store';
import { useOnboardingTourContext } from '../model/onboarding-tour-context';

interface OnboardingBottomBarProps {
  isLoggedIn: boolean;
}

export function OnboardingBottomBar({ isLoggedIn }: OnboardingBottomBarProps) {
  const { role, loading } = useCurrentUserRole();
  const { startTour, run, isDemoActive } = useOnboardingTourContext();

  const guest = useOnboardingProgressStore((s) => s.guest);
  const admin = useOnboardingProgressStore((s) => s.admin);
  const dismissBottomBar = useOnboardingProgressStore(
    (s) => s.dismissBottomBar,
  );
  const guestCurrentStep = useOnboardingSessionStore((s) =>
    s.activeFlow === 'guest' ? s.currentStepIndex : 0,
  );

  if (loading || isDemoActive || run) {
    return null;
  }

  const showGuest =
    role !== 'admin' && !guest.scenarioComplete && !guest.bottomBarDismissed;
  const showAdmin =
    role === 'admin' && !admin.scenarioComplete && !admin.bottomBarDismissed;

  if (!showGuest && !showAdmin) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[10040] border-t border-border bg-popover/95 px-4 py-3 text-popover-foreground shadow-lg backdrop-blur supports-[backdrop-filter]:bg-popover/80"
      role="region"
      aria-label="Обучение"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <Typography variant="small" className="font-semibold">
            {showGuest ? 'Интерактивное обучение магазину' : null}
            {showAdmin ? 'Обучение администратора' : null}
          </Typography>
          <Typography variant="muted" className="text-[12px]">
            Сценарий на демо-данных, отдельно от вашей корзины.
            {isLoggedIn ? (
              <>
                {' '}
                Подробности и выбор шага — в{' '}
                <Link
                  href={pagesPath.profile.$url().path}
                  className="underline underline-offset-2"
                >
                  профиле
                </Link>
                .
              </>
            ) : null}
          </Typography>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
          {showGuest ? (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const has =
                  guestCurrentStep > 0 || guest.completedStepIndices.length > 0;
                const resumeFrom = has
                  ? Math.min(
                      Math.max(
                        guestCurrentStep,
                        ...guest.completedStepIndices.map((v) => v + 1),
                      ),
                      GUEST_SCENARIO_STEP_COUNT - 1,
                    )
                  : 0;
                startTour('guest', resumeFrom);
              }}
            >
              {guest.completedStepIndices.length > 0
                ? 'Продолжить обучение'
                : 'Начать обучение'}
            </Button>
          ) : null}
          {showAdmin ? (
            <Button
              type="button"
              size="sm"
              onClick={() => startTour('admin', 0)}
            >
              Начать обучение
            </Button>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Скрыть панель"
            onClick={() => {
              if (showGuest) dismissBottomBar('guest');
              if (showAdmin) dismissBottomBar('admin');
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
