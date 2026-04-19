import { type OnboardingTargetId } from './onboarding-target-ids';

/** Селектор для Joyride `target` и для querySelector. */
export const onboardingSelector = (id: OnboardingTargetId): string =>
  `[data-onboarding="${id}"]`;
