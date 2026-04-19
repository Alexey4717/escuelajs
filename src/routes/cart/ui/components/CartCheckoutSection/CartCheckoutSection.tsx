'use client';

import { useCallback } from 'react';

import { useIsLgAndUp } from '@/shared/lib/hooks/use-is-lg-and-up';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Form } from '@/shared/ui/Form/Form';

import { useCurrentUser } from '@/entities/Session';

import { usePickupPointMapModal } from '@/features/pickupPointMap';

import { type CartCheckoutFormOutput } from '../../../lib/form/scheme';
import { useCartCheckoutForm } from '../../../lib/hooks/useCartCheckoutForm';
import { useMobileCheckoutPanel } from '../../../lib/hooks/useMobileCheckoutPanel';
import { useOnboardingCartCheckoutBridge } from '../../../lib/hooks/useOnboardingCartCheckoutBridge';
import { ClearCartButton } from '../ClearCartButton';
import { CartCheckoutFormFields } from './CartCheckoutFormFields';
import { CartCheckoutSectionHeader } from './CartCheckoutSectionHeader';
import { CartCheckoutSectionLoad } from './CartCheckoutSectionLoad';

export interface CartCheckoutSectionProps {
  onCheckoutSubmit: (data: CartCheckoutFormOutput) => Promise<void>;
  onClearCart: () => void;
  clearCartDisabled?: boolean;
}

export const CartCheckoutSection = ({
  onCheckoutSubmit,
  onClearCart,
  clearCartDisabled = false,
}: CartCheckoutSectionProps) => {
  const { user, loading } = useCurrentUser();
  const userName = user?.name ?? null;
  const userEmail = user?.email ?? null;

  if (loading) {
    return <CartCheckoutSectionLoad />;
  }

  const checkoutFormKey = `${userName ?? 'guest'}:${userEmail ?? 'guest'}`;

  return (
    <CartCheckoutSectionReady
      key={checkoutFormKey}
      onCheckoutSubmit={onCheckoutSubmit}
      onClearCart={onClearCart}
      clearCartDisabled={clearCartDisabled}
      userName={userName}
      userEmail={userEmail}
    />
  );
};

interface CartCheckoutSectionReadyProps extends CartCheckoutSectionProps {
  userName: string | null;
  userEmail: string | null;
}

const CartCheckoutSectionReady = ({
  onCheckoutSubmit,
  onClearCart,
  clearCartDisabled,
  userName,
  userEmail,
}: CartCheckoutSectionReadyProps) => {
  const isLg = useIsLgAndUp();
  const checkoutFormMethods = useCartCheckoutForm({
    onCheckoutSubmit,
    userName,
    userEmail,
  });
  const { methods, onSubmit } = checkoutFormMethods;
  const isSubmitting = methods.formState.isSubmitting;

  const mobilePanel = useMobileCheckoutPanel();
  const pickupPointMapModal = usePickupPointMapModal();

  useOnboardingCartCheckoutBridge({
    mobilePanel,
    methods,
    isLg,
  });

  const handlePickOnMap = useCallback(() => {
    pickupPointMapModal.open({
      onSelectPickupPoint: ({ name, latitude, longitude }) => {
        methods.setValue(
          'pickupAddress',
          `${name} (${latitude.toFixed(6)}, ${longitude.toFixed(6)})`,
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          },
        );
      },
    });
  }, [methods, pickupPointMapModal]);

  if (isLg) {
    return (
      <section
        className="mt-0 space-y-4 border-t-0 pt-0 lg:sticky lg:self-start"
        data-testid="cartRoute__section__checkout"
        data-onboarding={ONBOARDING_TARGET_IDS.cartCheckout}
      >
        <CartCheckoutSectionHeader>
          <ClearCartButton disabled={clearCartDisabled} onClear={onClearCart} />
        </CartCheckoutSectionHeader>
        <Form methods={methods} onSubmit={onSubmit} className="space-y-3">
          <CartCheckoutFormFields
            isSubmitting={isSubmitting}
            onPickOnMap={handlePickOnMap}
          />
        </Form>
      </section>
    );
  }

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-0 rounded-t-xl border-x border-t bg-popover p-0 text-popover-foreground shadow-lg"
      style={{ height: `${mobilePanel.mobilePanelHeightSafe}px` }}
    >
      <button
        type="button"
        aria-label="Resize checkout panel"
        className="flex touch-none cursor-row-resize select-none items-center justify-center py-2"
        onClick={mobilePanel.handlePanelToggle}
        onPointerDown={mobilePanel.handlePointerDown}
        onPointerMove={mobilePanel.handlePointerMove}
        onPointerUp={mobilePanel.handlePointerUp}
        onPointerCancel={mobilePanel.handlePointerCancel}
      >
        <span className="h-1 w-[100px] rounded-full bg-muted" />
      </button>
      <CartCheckoutSectionHeader className="px-4 pt-1">
        <ClearCartButton disabled={clearCartDisabled} onClear={onClearCart} />
      </CartCheckoutSectionHeader>
      <div
        className="min-h-0 overflow-y-auto px-4 pb-4 pt-2"
        data-testid="cartRoute__section__checkout"
        data-onboarding={ONBOARDING_TARGET_IDS.cartCheckout}
      >
        <Form methods={methods} onSubmit={onSubmit} className="space-y-3">
          <CartCheckoutFormFields
            isSubmitting={isSubmitting}
            onPickOnMap={handlePickOnMap}
          />
        </Form>
      </div>
    </section>
  );
};
