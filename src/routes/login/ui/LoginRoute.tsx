'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Form } from '@/shared/ui/Form/Form';

import { AuthFormShell } from '@/features/auth';

import { LoginEmailField, LoginPasswordField } from '../lib/form/fields';
import {
  loginFormDefaultValues,
  loginFormSchema,
  LoginFormStateInput,
  LoginFormStateOutput,
} from '../lib/form/scheme';
import { useSubmitHandler } from '../lib/form/useSubmitHandler';
import { useRegisterHref } from '../lib/hooks/useAuthQuery';
import { FormShellFooter } from './components/FormShellFooter';
import { SubmitButton } from './components/SubmitButton';

export const LoginRoute = () => {
  const methods = useForm<LoginFormStateInput, unknown, LoginFormStateOutput>({
    resolver: standardSchemaResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const registerHref = useRegisterHref();
  const { handleSubmit, loading } = useSubmitHandler();

  return (
    <AuthFormShell
      mode="login"
      title="Добро пожаловать"
      subtitle="Войдите, чтобы открыть профиль и оформлять заказы"
      registerHref={registerHref}
      footer={<FormShellFooter registerHref={registerHref} />}
    >
      <Form methods={methods} onSubmit={handleSubmit} className="space-y-3">
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
