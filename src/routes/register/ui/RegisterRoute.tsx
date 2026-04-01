'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ADD_USER, LOGIN } from '@/shared/api/graphql/auth';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { Form } from '@/shared/ui/Form/Form';

import { AuthFormShell } from '@/features/auth';

import {
  RegisterConfirmPasswordField,
  RegisterEmailField,
  RegisterNameField,
  RegisterPasswordField,
} from '../lib/form/fields';
import {
  registerFormSchema,
  RegisterFormStateInput,
  RegisterFormStateOutput,
} from '../lib/form/scheme';

const DEFAULT_AVATAR = 'https://placehold.co/200x200/e8e5df/1a1916?text=User';

export const RegisterRoute = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<
    RegisterFormStateInput,
    unknown,
    RegisterFormStateOutput
  >({
    resolver: standardSchemaResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    setValue,
  } = methods;

  useEffect(() => {
    if (errors.password) {
      setValue('confirmPassword', '');
    }
  }, [errors.password, setValue]);

  const showConfirmPassword = !errors.password;

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  const authQuery = useMemo(() => {
    const from = searchParams.get('from');
    return from ? `?${new URLSearchParams({ from }).toString()}` : '';
  }, [searchParams]);

  const loginHref = `/login${authQuery}`;
  const registerHref = `/register${authQuery}`;

  const [addUser, { loading: adding }] = useMutation(ADD_USER);
  const [login, { loading: loggingIn }] = useMutation(LOGIN);

  const loading = adding || loggingIn;

  async function onValidSubmit({
    name,
    email,
    password,
  }: RegisterFormStateOutput) {
    setError(null);
    try {
      const addRes = await addUser({
        variables: {
          data: {
            name: name.trim(),
            email: email.trim(),
            password,
            avatar: DEFAULT_AVATAR,
          },
        },
      });

      if (addRes.error) {
        setError(addRes.error.message ?? 'Не удалось зарегистрироваться');
        return;
      }

      const loginRes = await login({
        variables: { email: email.trim(), password },
      });

      if (loginRes.error) {
        setError(
          loginRes.error.message ??
            'Аккаунт создан, но вход не удался. Попробуйте войти вручную.',
        );
        return;
      }

      toast.success('Регистрация выполнена успешно');
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Не удалось зарегистрироваться';
      setError(message);
    }
  }

  return (
    <AuthFormShell
      mode="register"
      title="Создать аккаунт"
      subtitle="Заполните поля, чтобы зарегистрироваться в магазине"
      loginHref={loginHref}
      registerHref={registerHref}
    >
      <Form methods={methods} onSubmit={onValidSubmit} className="space-y-3">
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
          placeholder="Не менее 6 символов, заглавная буква и цифра"
        />

        {showConfirmPassword ? (
          <RegisterConfirmPasswordField
            type="password"
            autoComplete="new-password"
            placeholder="Повторите пароль"
          />
        ) : null}

        {error ? (
          <p
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13px] text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={loading || isSubmitting}
          className="mt-1.5 w-full py-2.5 text-[13px] hover:opacity-90 disabled:opacity-60"
          data-testid="register__button__submit"
        >
          {loading || isSubmitting ? 'Регистрация…' : 'Зарегистрироваться'}
        </Button>
      </Form>
    </AuthFormShell>
  );
};
