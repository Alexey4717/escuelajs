import { Button } from '@/shared/ui/Button/Button';

import {
  CartCheckoutEmailField,
  CartCheckoutNameField,
  CartCheckoutPickupAddressField,
} from '../../../lib/form/fields';

interface CartCheckoutFormFieldsProps {
  isSubmitting: boolean;
}

export function CartCheckoutFormFields({
  isSubmitting,
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
          type="button"
          variant="outline"
          className="w-full shrink-0 sm:mb-0 sm:w-auto"
          data-testid="cartRoute__button__pickOnMap"
        >
          Выбрать на карте
        </Button>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        data-testid="cartRoute__button__placeOrder"
        disabled={isSubmitting}
      >
        Заказать
      </Button>
    </>
  );
}
