'use client';

import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { passwordSchema } from '@/shared/lib/form';

import {
  registerFormDefaultValues,
  RegisterFormStateInput,
} from '../form/scheme';

function computePasswordValid(password: string) {
  return passwordSchema.safeParse(password).success;
}

export function useRegisterPasswordValidity() {
  const { watch, setValue, getValues } =
    useFormContext<RegisterFormStateInput>();

  const [passwordIsValid, setPasswordIsValid] = useState(() =>
    computePasswordValid(registerFormDefaultValues.password),
  );

  useEffect(() => {
    const syncValidity = () => {
      const password = getValues('password') ?? '';
      const next = computePasswordValid(password);
      setPasswordIsValid((prev) => (prev === next ? prev : next));
    };

    syncValidity();

    const { unsubscribe } = watch((_, info) => {
      if (info.name !== undefined && info.name !== 'password') {
        return;
      }
      syncValidity();
    });

    return unsubscribe;
  }, [watch, getValues]);

  useEffect(() => {
    if (!passwordIsValid) {
      setValue('confirmPassword', '');
    }
  }, [passwordIsValid, setValue]);

  return passwordIsValid;
}
