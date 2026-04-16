import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';

import {
  CartCheckoutEmailField,
  CartCheckoutNameField,
  CartCheckoutPickupAddressField,
} from '../../../lib/form/fields';

interface CartCheckoutFormFieldsProps {
  isSubmitting: boolean;
  onPickOnMap: () => void;
}

export function CartCheckoutFormFields({
  isSubmitting,
  onPickOnMap,
}: CartCheckoutFormFieldsProps) {
  return (
    <>
      <CartCheckoutNameField autoComplete="name" />
      <CartCheckoutEmailField type="email" autoComplete="email" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
        <div className="min-w-0 flex-1">
          <CartCheckoutPickupAddressField autoComplete="street-address" />
        </div>
        <Button
          onClick={onPickOnMap}
          type="button"
          variant="outline"
          className="w-full shrink-0 sm:mb-0 sm:w-auto"
          data-testid="cartRoute__button__pickOnMap"
          data-onboarding={ONBOARDING_TARGET_IDS.cartPickOnMapButton}
        >
          Выбрать на карте
        </Button>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        data-testid="cartRoute__button__placeOrder"
        data-onboarding={ONBOARDING_TARGET_IDS.cartPlaceOrderButton}
        disabled={isSubmitting}
      >
        Заказать
      </Button>
    </>
  );
}
