'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { AddUserDocument, LoginDocument } from '@/shared/api/generated/graphql';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';

import { DEFAULT_AVATAR } from '../constants';
import { RegisterFormStateOutput } from './scheme';

export const useSubmitHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [addUser, { loading: adding }] = useMutation(AddUserDocument);
  const [login, { loading: loggingIn }] = useMutation(LoginDocument);

  const loading = adding || loggingIn;

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  const handleSubmit = async ({
    name,
    email,
    password,
  }: RegisterFormStateOutput) => {
    try {
      await addUser({
        variables: {
          data: {
            name: name.trim(),
            email: email.trim(),
            password,
            avatar: DEFAULT_AVATAR,
          },
        },
      });

      await login({
        variables: { email: email.trim(), password },
      });

      // #region agent log
      emitDebugSessionLog({
        hypothesisId: 'H6',
        location: 'useSubmitHandler register',
        message: 'AddUser+Login mutations settled on client',
        data: { redirectTo, nextNavigation: 'replace-only' },
      });
      // #endregion
      toast.success('Registration completed successfully');
      router.replace(redirectTo);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleSubmit,
    loading,
  };
};
