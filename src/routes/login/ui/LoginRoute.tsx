'use client';

import { type SubmitEvent, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';

import { LOGIN } from '@/shared/api/graphql/auth';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { TextField } from '@/shared/ui/TextField/TextField';

import { AuthFormShell } from '@/routes/auth/ui/AuthFormShell';

export const LoginRoute = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError(null);
    try {
      const result = await login({
        variables: { email, password },
      });
      if (result.error) {
        setError(result.error.message ?? 'Ошибка входа');
        return;
      }
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
      <form className="space-y-3" onSubmit={onSubmit} noValidate>
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="login-password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading}
          className="mt-1.5 w-full py-2.5 text-[13px] hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Вход…' : 'Войти'}
        </Button>
      </form>
    </AuthFormShell>
  );
};
