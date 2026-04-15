import { useEffect, useMemo } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import {
  ONBOARDING_DEMO_CHECKOUT,
  useOnboardingSessionStore,
} from '@/features/onboarding';

import {
  type CartCheckoutFormInput,
  type CartCheckoutFormOutput,
  cartCheckoutFormSchema,
  getCartCheckoutDefaultValues,
} from '../form/scheme';

interface UseCartCheckoutFormParams {
  onCheckoutSubmit: (data: CartCheckoutFormOutput) => Promise<void>;
  userName: string | null;
  userEmail: string | null;
}

export function useCartCheckoutForm({
  onCheckoutSubmit,
  userName,
  userEmail,
}: UseCartCheckoutFormParams) {
  const isOnboardingDemoActive = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'guest',
  );
  const onboardingStepIndex = useOnboardingSessionStore(
    (s) => s.currentStepIndex,
  );
  const defaultValues = useMemo(
    () =>
      isOnboardingDemoActive
        ? {
            ...getCartCheckoutDefaultValues({
              name: ONBOARDING_DEMO_CHECKOUT.name,
              email: ONBOARDING_DEMO_CHECKOUT.email,
            }),
            pickupAddress:
              onboardingStepIndex >= 6
                ? ONBOARDING_DEMO_CHECKOUT.pickupAddress
                : '',
          }
        : getCartCheckoutDefaultValues({ name: userName, email: userEmail }),
    [isOnboardingDemoActive, onboardingStepIndex, userEmail, userName],
  );

  const methods = useForm<
    CartCheckoutFormInput,
    unknown,
    CartCheckoutFormOutput
  >({
    resolver: standardSchemaResolver(cartCheckoutFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CartCheckoutFormOutput) => {
    await onCheckoutSubmit(data);
    methods.reset(
      isOnboardingDemoActive
        ? {
            ...getCartCheckoutDefaultValues({
              name: ONBOARDING_DEMO_CHECKOUT.name,
              email: ONBOARDING_DEMO_CHECKOUT.email,
            }),
            pickupAddress:
              onboardingStepIndex >= 6
                ? ONBOARDING_DEMO_CHECKOUT.pickupAddress
                : '',
          }
        : getCartCheckoutDefaultValues({ name: userName, email: userEmail }),
    );
  };

  useEffect(() => {
    if (!isOnboardingDemoActive || onboardingStepIndex < 6) {
      return;
    }
    methods.setValue('name', ONBOARDING_DEMO_CHECKOUT.name, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    methods.setValue('email', ONBOARDING_DEMO_CHECKOUT.email, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    methods.setValue('pickupAddress', ONBOARDING_DEMO_CHECKOUT.pickupAddress, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [isOnboardingDemoActive, onboardingStepIndex, methods]);

  return { methods, onSubmit };
}
