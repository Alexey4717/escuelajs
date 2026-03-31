'use client';

import { type SubmitEvent, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@apollo/client/react';

import { ADD_USER, LOGIN } from '@/shared/api/graphql/auth';
import { sanitizeLoginFromParam } from '@/shared/lib/redirects/safe-login-redirect';

import { AuthFormShell } from '@/routes/auth/ui/AuthFormShell';

const DEFAULT_AVATAR = 'https://placehold.co/200x200/e8e5df/1a1916?text=User';

const fieldLabel = 'mb-1.5 block text-[11px] uppercase tracking-[0.4px] text-muted-foreground';
const fieldInput =
  'h-[38px] w-full rounded-md border border-border bg-muted px-3 text-[13px] text-foreground outline-none transition-[border-color] duration-150 placeholder:text-muted-foreground/70 focus:border-primary';

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
          loginRes.error.message ?? 'Аккаунт создан, но вход не удался. Попробуйте войти вручную.',
        );
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось зарегистрироваться';
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
        <div>
          <label className={fieldLabel} htmlFor="register-name">
            Имя
          </label>
          <input
            id="register-name"
            className={fieldInput}
            type="text"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            className={fieldInput}
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="register-password">
            Пароль
          </label>
          <input
            id="register-password"
            className={fieldInput}
            type="password"
            autoComplete="new-password"
            required
            minLength={4}
            placeholder="Не менее 4 символов"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error ? (
          <p
            className="rounded-md border border-error/30 bg-error/10 px-3 py-2 text-[13px] text-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 w-full cursor-pointer rounded-md bg-primary py-2.5 text-[13px] font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Регистрация…' : 'Зарегистрироваться'}
        </button>
      </form>
    </AuthFormShell>
  );
};
