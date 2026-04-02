'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/Button/Button';

import { LoginFormStateOutput } from '../../lib/form/scheme';

interface SubmitButtonProps {
  loading: boolean;
}

export const SubmitButton = ({ loading }: SubmitButtonProps) => {
  const { formState } = useFormContext<LoginFormStateOutput>();
  const inProcessing = loading || formState.isSubmitting;
  return (
    <Button
      type="submit"
      disabled={inProcessing}
      className="mt-1.5 w-full py-2.5 text-[13px] hover:opacity-90 disabled:opacity-60"
      data-testid="login__button__submit"
    >
      {inProcessing ? 'Вход…' : 'Войти'}
    </Button>
  );
};
