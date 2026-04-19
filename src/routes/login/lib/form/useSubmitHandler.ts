'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { LoginDocument } from '@/shared/api/generated/graphql';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';
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
      // #region agent log
      emitDebugSessionLog({
        hypothesisId: 'H6',
        location: 'useSubmitHandler login',
        message: 'Login mutation settled on client',
        data: { redirectTo, nextNavigation: 'location-assign' },
      });
      // #endregion
      toast.success('Signed in successfully');
      // Полная перезагрузка целевого URL: после Set-Cookie soft-navigation (router.replace)
      // может параллельно запросить RSC без cookie (в логах H2: jwtSegmentCount 1) — пустой профиль и Sign in.
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
