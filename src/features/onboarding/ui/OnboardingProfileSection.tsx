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
  'Products menu',
  'Filters',
  'Add to cart from list',
  'Second product card',
  'Cart on product page',
  'Cart icon',
  '“Choose on map” button',
  'Pickup point on map',
  '“Place order” button',
  'Contact form',
];

const ADMIN_LABELS = [
  'Users tab',
  'Users list',
  'Admin panel tab',
  '“Add category” button',
  'Category creation form',
  'Categories list',
  '“Add product” button',
  'Product creation form',
  'Products list',
  'Product actions',
];

export const OnboardingProfileSection = () => {
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
    <div className="min-w-0 flex-1 space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      {role !== 'admin' ? (
        <div className="space-y-3">
          <Typography variant="h5" component="h2">
            Store onboarding
          </Typography>
          <Typography variant="muted" className="text-sm">
            Progress is saved in your browser by step.
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
              ? 'Restart onboarding'
              : 'Start onboarding'}
          </Button>
        </div>
      ) : null}

      {role === 'admin' ? (
        <div className="space-y-3">
          <Typography variant="h5" component="h2">
            Admin onboarding
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
              ? 'Restart onboarding'
              : 'Start onboarding'}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
