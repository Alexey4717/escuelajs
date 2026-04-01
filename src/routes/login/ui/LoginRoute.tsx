'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { LOGIN } from '@/shared/api/graphql/auth';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { Form } from '@/shared/ui/Form/Form';

import { AuthFormShell } from '@/features/auth';

import { LoginEmailField, LoginPasswordField } from '../lib/form/fields';
import {
  loginFormSchema,
  LoginFormStateInput,
  LoginFormStateOutput,
} from '../lib/form/scheme';

export const LoginRoute = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<LoginFormStateInput, unknown, LoginFormStateOutput>({
    resolver: standardSchemaResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState } = methods;

  const redirectTo = useMemo(
    () => sanitizeLoginFromParam(searchParams.get('from')),
    [searchParams],
  );

  const authQuery = useMemo(() => {
    const from = searchParams.get('from');
    return from ? `?${new URLSearchParams({ from }).toString()}` : '';
  }, [searchParams]);

  const registerHref = `/register${authQuery}`;

  const [login, { loading }] = useMutation(LOGIN);

  async function onValidSubmit({ email, password }: LoginFormStateOutput) {
    setError(null);
    try {
      const result = await login({
        variables: { email: email.trim(), password },
      });
      if (result.error) {
        setError(result.error.message ?? 'Ошибка входа');
        return;
      }
      toast.success('Вход выполнен успешно');
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка входа';
      setError(message);
    }
  }

  return (
    <AuthFormShell
      mode="login"
      title="Добро пожаловать"
      subtitle="Войдите, чтобы открыть профиль и оформлять заказы"
      registerHref={registerHref}
      footer={
        <p className="text-center text-[11px] text-muted-foreground">
          Нет аккаунта?{' '}
          <Link
            href={registerHref}
            className="font-medium text-primary underline-offset-2 transition-colors hover:underline"
            prefetch
          >
            Зарегистрироваться →
          </Link>
        </p>
      }
    >
      <Form<LoginFormStateOutput>
        methods={methods}
        onSubmit={onValidSubmit}
        className="space-y-3"
      >
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
          disabled={loading || formState.isSubmitting}
          className="mt-1.5 w-full py-2.5 text-[13px] hover:opacity-90 disabled:opacity-60"
          data-testid="login__button__submit"
        >
          {loading || formState.isSubmitting ? 'Вход…' : 'Войти'}
        </Button>
      </Form>
    </AuthFormShell>
  );
};
