'use client';

import { type ReactNode } from 'react';

import { useRegisterPasswordValidity } from '../../lib/hooks/useRegisterPasswordValidity';

interface ConfirmPasswordFieldHandlerProps {
  children: ReactNode;
}

export const ConfirmPasswordFieldHandler = ({
  children,
}: ConfirmPasswordFieldHandlerProps) => {
  const passwordIsValid = useRegisterPasswordValidity();

  return passwordIsValid ? <>{children}</> : null;
};
