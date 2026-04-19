'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { LoginDocument } from '@/shared/api/generated/graphql';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';

import { LoginFormStateOutput } from './scheme';

export const useSubmitHandler = () => {
  const searchParams = useSearchParams();

  const [login, { loading }] = useMutation(LoginDocument);

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  const handleSubmit = async ({ email, password }: LoginFormStateOutput) => {
    try {
      await login({
        variables: { email: email.trim(), password },
      });
      toast.success('Signed in successfully');
      window.location.assign(redirectTo);
    } catch (err) {
      console.error(err);
      toast.error('Sign in failed');
    }
  };

  return {
    handleSubmit,
    loading,
  };
};
