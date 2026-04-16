import { createEventBus } from '@/shared/lib/event-bus/event-bus';

export type OnboardingEventMap = {
  clearPickupAddress: undefined;
  openMobileSidebar: undefined;
  openMobileCheckout: undefined;
  mapPickupSelected: undefined;
};

export const onboardingEventBus = createEventBus<OnboardingEventMap>();
