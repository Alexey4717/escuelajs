import { input, object, output, string } from 'zod/v4';

import { emailSchema } from '@/shared/lib/form';

export const cartCheckoutFormSchema = object({
  name: string()
    .min(1, 'Enter your name')
    .meta({
      formField: {
        label: 'Name',
        'data-testid': 'cart__input__name',
      },
    }),
  email: emailSchema.meta({
    formField: {
      label: 'Email',
      'data-testid': 'cart__input__email',
    },
  }),
  pickupAddress: string()
    .min(1, 'Enter the pickup point address')
    .meta({
      formField: {
        label: 'Pickup point address',
        'data-testid': 'cart__input__pickupAddress',
      },
    }),
});

export type CartCheckoutFormInput = input<typeof cartCheckoutFormSchema>;
export type CartCheckoutFormOutput = output<typeof cartCheckoutFormSchema>;

export function getCartCheckoutDefaultValues(user?: {
  name?: string | null;
  email?: string | null;
}): CartCheckoutFormInput {
  return {
    name: user?.name ?? '',
    email: user?.email ?? '',
    pickupAddress: '',
  };
}
