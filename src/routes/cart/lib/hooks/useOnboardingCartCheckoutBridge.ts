import { useCallback, useEffect } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { onboardingEventBus } from '@/features/onboarding';

import { CartCheckoutFormInput, CartCheckoutFormOutput } from '../form/scheme';
import { useMobileCheckoutPanel } from './useMobileCheckoutPanel';

interface UseOnboardingCartCheckoutBridgeParams {
  methods: UseFormReturn<
    CartCheckoutFormInput,
    unknown,
    CartCheckoutFormOutput
  >;
  isLg: boolean;
  mobilePanel: ReturnType<typeof useMobileCheckoutPanel>;
}

export function useOnboardingCartCheckoutBridge({
  methods,
  isLg,
  mobilePanel,
}: UseOnboardingCartCheckoutBridgeParams): void {
  const clearPickupAddress = useCallback(() => {
    methods.setValue('pickupAddress', '', {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    methods.clearErrors('pickupAddress');
  }, [methods]);

  const openMobileCheckout = useCallback(() => {
    if (!isLg) {
      mobilePanel.expandPanel();
    }
  }, [isLg, mobilePanel]);

  useEffect(() => {
    const unsubscribeClear = onboardingEventBus.on(
      'clearPickupAddress',
      clearPickupAddress,
    );
    const unsubscribeOpen = onboardingEventBus.on(
      'openMobileCheckout',
      openMobileCheckout,
    );

    return () => {
      unsubscribeClear();
      unsubscribeOpen();
    };
  }, [clearPickupAddress, openMobileCheckout]);
}
