import { X } from 'lucide-react';
import { type TooltipRenderProps } from 'react-joyride';

import { cn } from '@/shared/lib/styles/cn';

import { getOnboardingStepData } from '../lib/onboarding-step-behavior';

export function OnboardingJoyrideTooltip({
  backProps,
  closeProps,
  index,
  primaryProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  const advanceMode = getOnboardingStepData(step)?.advanceMode;
  const showPrimaryButton =
    advanceMode === 'tooltipNext' || advanceMode === 'tooltipLast';
  const primaryLabel = advanceMode === 'tooltipLast' ? 'Last' : 'Next';
  const showBackButton = index > 0;

  return (
    <section
      {...tooltipProps}
      className={cn(
        'w-[min(420px,calc(100vw-2rem))] rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl',
        'overflow-hidden',
      )}
    >
      <header className="flex items-start justify-between gap-3 px-5 pb-1 pt-5">
        {step.title ? (
          <div className="text-[1.65rem] font-bold leading-tight tracking-tight text-foreground">
            {step.title}
          </div>
        ) : (
          <div />
        )}
        <button
          {...closeProps}
          className={cn(
            'inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition',
            'hover:border-border hover:text-foreground',
          )}
        >
          <X className="size-4" aria-hidden />
        </button>
      </header>

      <div className="px-5 pb-5 text-base leading-relaxed text-muted-foreground">
        {step.content}
      </div>

      {showBackButton || showPrimaryButton ? (
        <footer className="flex items-center justify-end gap-2 border-t border-border/80 px-5 py-4">
          {showBackButton ? (
            <button
              {...backProps}
              className={cn(
                'inline-flex h-10 items-center justify-center rounded-md px-4 text-base font-medium text-muted-foreground transition',
                'hover:bg-muted hover:text-foreground',
              )}
            >
              Back
            </button>
          ) : null}
          {showPrimaryButton ? (
            <button
              {...primaryProps}
              className={cn(
                'inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-base font-medium text-foreground transition',
                'hover:bg-muted',
              )}
            >
              {primaryLabel}
            </button>
          ) : null}
        </footer>
      ) : null}
    </section>
  );
}
