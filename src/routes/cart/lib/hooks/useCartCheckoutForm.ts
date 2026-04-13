import { useMemo } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

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
  const defaultValues = useMemo(
    () => getCartCheckoutDefaultValues({ name: userName, email: userEmail }),
    [userEmail, userName],
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
      getCartCheckoutDefaultValues({ name: userName, email: userEmail }),
    );
  };

  return { methods, onSubmit };
}
