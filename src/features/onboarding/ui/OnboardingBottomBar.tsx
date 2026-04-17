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
  const hasHydrated = useOnboardingProgressStore((s) => s.hasHydrated);
  const dismissBottomBar = useOnboardingProgressStore(
    (s) => s.dismissBottomBar,
  );
  const guestCurrentStep = useOnboardingSessionStore((s) =>
    s.activeFlow === 'guest' ? s.currentStepIndex : 0,
  );

  if (loading || !hasHydrated || isDemoActive || run) {
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
      aria-label="Onboarding"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <Typography variant="small" className="font-semibold">
            {showGuest ? 'Interactive store onboarding' : null}
            {showAdmin ? 'Admin onboarding' : null}
          </Typography>
          <Typography variant="muted" className="text-[12px]">
            Demo scenario runs separately from your actual cart.
            {isLoggedIn ? (
              <>
                {' '}
                Details and step selection are available in your{' '}
                <Link
                  href={pagesPath.profile.$url().path}
                  className="underline underline-offset-2"
                >
                  profile
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
                ? 'Continue onboarding'
                : 'Start onboarding'}
            </Button>
          ) : null}
          {showAdmin ? (
            <Button
              type="button"
              size="sm"
              onClick={() => startTour('admin', 0)}
            >
              Start onboarding
            </Button>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Hide panel"
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
