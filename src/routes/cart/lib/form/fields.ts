import { createRHFTextField } from '@/shared/lib/form';

import { cartCheckoutFormSchema } from './scheme';

export const CartCheckoutNameField = createRHFTextField(
  cartCheckoutFormSchema,
  'name',
);

export const CartCheckoutEmailField = createRHFTextField(
  cartCheckoutFormSchema,
  'email',
);

export const CartCheckoutPickupAddressField = createRHFTextField(
  cartCheckoutFormSchema,
  'pickupAddress',
);
