import { type OnboardingTargetId } from './onboarding-target-ids';

/** Селектор для Joyride `target` и для querySelector. */
export function onboardingSelector(id: OnboardingTargetId): string {
  return `[data-onboarding="${id}"]`;
}
