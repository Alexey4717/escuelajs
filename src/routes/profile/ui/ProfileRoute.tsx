'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { skipToken, useQuery } from '@apollo/client/react';

import { isUnauthorized } from '@/shared/api/apollo-client';
import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

type ProfileRouteProps = {
  userId: string;
};

export const ProfileRoute = ({ userId }: ProfileRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // резолвер запроса myProfile возвращает всегда 404
  // Из-за баги на сервере временно используем запрос UserDetails вместо myProfile
  const { data, error, loading } = useQuery(
    UserDetailsDocument,
    userId
      ? {
          variables: { id: userId },
        }
      : skipToken,
  );

  useEffect(() => {
    if (!error) return;
    if (isUnauthorized(error)) {
      router.replace(loginPageUrlWithFrom(pathname));
    }
  }, [error, pathname, router]);

  async function logout() {
    await clearAuthSession();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return <div>Загрузка профиля…</div>;
  }

  if (error) {
    if (isUnauthorized(error)) {
      return <p>Перенаправление на вход…</p>;
    }
    return (
      <div>
        <p>Не удалось загрузить профиль</p>
        <p>{error.message}</p>
        <Link href="/">На главную</Link>
        <Button type="button" variant="outline" onClick={logout}>
          Выйти
        </Button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const u = data.user;

  return (
    <div>
      <h2>Профиль</h2>

      <Button type="button" variant="secondary">
        Редактировать
      </Button>
      <Button type="button" variant="outline" onClick={logout}>
        Выйти
      </Button>

      <div>
        <h3>Данные аккаунта</h3>
        <span>{u.id}</span>
        <span>{initials(u.name)}</span>
        <span>{u.name}</span>
        <span>{u.email}</span>
        <span>{u.role}</span>
        <span>{new Date(u.creationAt).toLocaleString()}</span>
      </div>
    </div>
  );
};
