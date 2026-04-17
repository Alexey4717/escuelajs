'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { LoginDocument } from '@/shared/api/generated/graphql';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';

import { LoginFormStateOutput } from './scheme';

export const useSubmitHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [login, { loading }] = useMutation(LoginDocument);

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  async function handleSubmit({ email, password }: LoginFormStateOutput) {
    try {
      await login({
        variables: { email: email.trim(), password },
      });
      toast.success('Signed in successfully');
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Sign in failed');
    }
  }

  return {
    handleSubmit,
    loading,
  };
};
