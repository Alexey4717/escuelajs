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
      title="Create account"
      subtitle="Fill in the fields to register in the store"
      loginHref={loginHref}
      registerHref={registerHref}
    >
      <Form methods={methods} onSubmit={handleSubmit} className="space-y-3">
        <RegisterNameField
          type="text"
          autoComplete="name"
          placeholder="John Doe"
        />
        <RegisterEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <RegisterPasswordField
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
        />

        <ConfirmPasswordFieldHandler>
          <RegisterConfirmPasswordField
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
          />
        </ConfirmPasswordFieldHandler>

        <SubmitButton loading={loading} />
      </Form>
    </AuthFormShell>
  );
};
