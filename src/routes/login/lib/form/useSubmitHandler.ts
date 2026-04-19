'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { LoginDocument } from '@/shared/api/generated/graphql';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';
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

  const handleSubmit = async ({ email, password }: LoginFormStateOutput) => {
    try {
      await login({
        variables: { email: email.trim(), password },
      });
      // #region agent log
      emitDebugSessionLog({
        hypothesisId: 'H6',
        location: 'useSubmitHandler login',
        message: 'Login mutation settled on client',
        data: { redirectTo, nextNavigation: 'replace-only' },
      });
      // #endregion
      toast.success('Signed in successfully');
      // Не вызывать router.refresh() сразу после входа: на текущем URL ещё /login,
      // refresh перезапрашивает RSC именно логина и может «перебить» переход на /profile.
      router.replace(redirectTo);
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
