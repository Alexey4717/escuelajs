'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { LoginDocument } from '@/shared/api/generated/graphql';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';
import { Form } from '@/shared/ui/Form/Form';

import { AuthFormShell } from '@/features/auth';

import { LoginEmailField, LoginPasswordField } from '../lib/form/fields';
import {
  loginFormDefaultValues,
  loginFormSchema,
  LoginFormStateInput,
  LoginFormStateOutput,
} from '../lib/form/scheme';
import { FormShellFooter } from './components/FormShellFooter';
import { SubmitButton } from './components/SubmitButton';

export const LoginRoute = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<LoginFormStateInput, unknown, LoginFormStateOutput>({
    resolver: standardSchemaResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  const authQuery = useMemo(() => {
    const from = searchParams.get('from');
    return from ? `?${new URLSearchParams({ from }).toString()}` : '';
  }, [searchParams]);

  const registerHref = `/register${authQuery}`;

  const [login, { loading }] = useMutation(LoginDocument);

  async function onValidSubmit({ email, password }: LoginFormStateOutput) {
    try {
      await login({
        variables: { email: email.trim(), password },
      });
      toast.success('Вход выполнен успешно');
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthFormShell
      mode="login"
      title="Добро пожаловать"
      subtitle="Войдите, чтобы открыть профиль и оформлять заказы"
      registerHref={registerHref}
      footer={<FormShellFooter registerHref={registerHref} />}
    >
      <Form methods={methods} onSubmit={onValidSubmit} className="space-y-3">
        <LoginEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <LoginPasswordField
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <SubmitButton loading={loading} />
      </Form>
    </AuthFormShell>
  );
};
