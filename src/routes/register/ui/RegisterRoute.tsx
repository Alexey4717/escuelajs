'use client';

import { type SubmitEvent, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';

import { ADD_USER, LOGIN } from '@/shared/api/graphql/auth';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { TextField } from '@/shared/ui/TextField/TextField';

import { AuthFormShell } from '@/features/auth';

const DEFAULT_AVATAR = 'https://placehold.co/200x200/e8e5df/1a1916?text=User';

// TODO добавить поле confirmPassword
// https://www.youtube.com/watch?v=vI28woiCpCQ
export const RegisterRoute = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
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

  const loginHref = `/login${authQuery}`;
  const registerHref = `/register${authQuery}`;

  const [addUser, { loading: adding }] = useMutation(ADD_USER);
  const [login, { loading: loggingIn }] = useMutation(LOGIN);

  const loading = adding || loggingIn;

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
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
      <form className="space-y-3" onSubmit={onSubmit} noValidate>
        <TextField
          id="register-name"
          label="Имя"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          placeholder="Иван Иванов"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="register-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="register-password"
          label="Пароль"
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
          placeholder="Не менее 4 символов"
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
          {loading ? 'Регистрация…' : 'Зарегистрироваться'}
        </Button>
      </form>
    </AuthFormShell>
  );
};
