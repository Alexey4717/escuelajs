import { type Step } from 'react-joyride';

export type OnboardingStepAdvanceMode =
  | 'targetClick'
  | 'tooltipNext'
  | 'tooltipLast'
  | 'mapEvent';

export type OnboardingStepData = {
  advanceMode: OnboardingStepAdvanceMode;
};
export const getOnboardingStepData = (
  step: Step,
): OnboardingStepData | null => {
  const data = step.data;
  if (data == null || typeof data !== 'object') {
    return null;
  }

  const maybeAdvanceMode = (data as Partial<OnboardingStepData>).advanceMode;
  if (
    maybeAdvanceMode !== 'targetClick' &&
    maybeAdvanceMode !== 'tooltipNext' &&
    maybeAdvanceMode !== 'tooltipLast' &&
    maybeAdvanceMode !== 'mapEvent'
  ) {
    return null;
  }

  return {
    advanceMode: maybeAdvanceMode,
  };
};
