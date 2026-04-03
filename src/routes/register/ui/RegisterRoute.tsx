'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Form } from '@/shared/ui/Form/Form';

import { AuthFormShell } from '@/features/auth';

import {
  RegisterConfirmPasswordField,
  RegisterEmailField,
  RegisterNameField,
  RegisterPasswordField,
} from '../lib/form/fields';
import {
  registerFormDefaultValues,
  registerFormSchema,
  RegisterFormStateInput,
  RegisterFormStateOutput,
} from '../lib/form/scheme';
import { useSubmitHandler } from '../lib/form/useSubmitHandler';
import { useAuthQuery } from '../lib/hooks/useAuthQuery';
import { ConfirmPasswordFieldHandler } from './components/ConfirmPasswordFieldHandler';
import { SubmitButton } from './components/SubmitButton';

export const RegisterRoute = () => {
  const methods = useForm<
    RegisterFormStateInput,
    unknown,
    RegisterFormStateOutput
  >({
    resolver: standardSchemaResolver(registerFormSchema),
    defaultValues: registerFormDefaultValues,
  });

  const { loginHref, registerHref } = useAuthQuery();
  const { handleSubmit, loading } = useSubmitHandler();

  return (
    <AuthFormShell
      mode="register"
      title="Создать аккаунт"
      subtitle="Заполните поля, чтобы зарегистрироваться в магазине"
      loginHref={loginHref}
      registerHref={registerHref}
    >
      <Form methods={methods} onSubmit={handleSubmit} className="space-y-3">
        <RegisterNameField
          type="text"
          autoComplete="name"
          placeholder="Иван Иванов"
        />
        <RegisterEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <RegisterPasswordField
          type="password"
          autoComplete="new-password"
          placeholder="Не менее 6 символов"
        />

        <ConfirmPasswordFieldHandler>
          <RegisterConfirmPasswordField
            type="password"
            autoComplete="new-password"
            placeholder="Повторите пароль"
          />
        </ConfirmPasswordFieldHandler>

        <SubmitButton loading={loading} />
      </Form>
    </AuthFormShell>
  );
};
