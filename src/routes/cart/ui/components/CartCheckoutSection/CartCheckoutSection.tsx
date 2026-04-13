'use client';

import { useIsLgAndUp } from '@/shared/lib/hooks/use-is-lg-and-up';
import { Form } from '@/shared/ui/Form/Form';

import { useCurrentUser } from '@/entities/Session';

import { type CartCheckoutFormOutput } from '../../../lib/form/scheme';
import { useCartCheckoutForm } from '../../../lib/hooks/useCartCheckoutForm';
import { useMobileCheckoutPanel } from '../../../lib/hooks/useMobileCheckoutPanel';
import { ClearCartButton } from '../ClearCartButton';
import { CartCheckoutFormFields } from './CartCheckoutFormFields';
import { CartCheckoutSectionHeader } from './CartCheckoutSectionHeader';

export interface CartCheckoutSectionProps {
  onCheckoutSubmit: (data: CartCheckoutFormOutput) => Promise<void>;
  onClearCart: () => void;
}

export function CartCheckoutSection({
  onCheckoutSubmit,
  onClearCart,
}: CartCheckoutSectionProps) {
  const { user, loading } = useCurrentUser();
  const userName = user?.name ?? null;
  const userEmail = user?.email ?? null;

  if (loading) {
    return null;
  }

  const checkoutFormKey = `${userName ?? 'guest'}:${userEmail ?? 'guest'}`;

  return (
    <CartCheckoutSectionReady
      key={checkoutFormKey}
      onCheckoutSubmit={onCheckoutSubmit}
      onClearCart={onClearCart}
      userName={userName}
      userEmail={userEmail}
    />
  );
}

interface CartCheckoutSectionReadyProps extends CartCheckoutSectionProps {
  userName: string | null;
  userEmail: string | null;
}

function CartCheckoutSectionReady({
  onCheckoutSubmit,
  onClearCart,
  userName,
  userEmail,
}: CartCheckoutSectionReadyProps) {
  const isLg = useIsLgAndUp();
  const methods = useCartCheckoutForm({
    onCheckoutSubmit,
    userName,
    userEmail,
  });
  const mobilePanel = useMobileCheckoutPanel();
  const isSubmitting = methods.methods.formState.isSubmitting;

  if (isLg) {
    return (
      <section
        className="mt-0 space-y-4 border-t-0 pt-0 lg:sticky lg:self-start"
        data-testid="cartRoute__section__checkout"
      >
        <CartCheckoutSectionHeader>
          <ClearCartButton onClear={onClearCart} />
        </CartCheckoutSectionHeader>
        <Form
          methods={methods.methods}
          onSubmit={methods.onSubmit}
          className="space-y-3"
        >
          <CartCheckoutFormFields isSubmitting={isSubmitting} />
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
        aria-label="Изменить высоту панели оформления"
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
        <ClearCartButton onClear={onClearCart} />
      </CartCheckoutSectionHeader>
      <div
        className="min-h-0 overflow-y-auto px-4 pb-4 pt-2"
        data-testid="cartRoute__section__checkout"
      >
        <Form
          methods={methods.methods}
          onSubmit={methods.onSubmit}
          className="space-y-3"
        >
          <CartCheckoutFormFields isSubmitting={isSubmitting} />
        </Form>
      </div>
    </section>
  );
}
