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
import { Typography } from '@/shared/ui/Typography/Typography';

import { getUserInitials } from '@/entities/User';

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
    return (
      <Typography variant="body1" component="div">
        Загрузка профиля…
      </Typography>
    );
  }

  if (error) {
    if (isUnauthorized(error)) {
      return (
        <Typography variant="body1" component="p">
          Перенаправление на вход…
        </Typography>
      );
    }
    return (
      <div>
        <Typography variant="body1" component="p">
          Не удалось загрузить профиль
        </Typography>
        <Typography variant="body2" component="p">
          {error.message}
        </Typography>
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
      <Typography variant="h2" gutterBottom>
        Профиль
      </Typography>

      <Button type="button" variant="secondary">
        Редактировать
      </Button>
      <Button type="button" variant="outline" onClick={logout}>
        Выйти
      </Button>

      <div>
        <Typography variant="h3" gutterBottom>
          Данные аккаунта
        </Typography>
        <span>{u.id}</span>
        <span>{getUserInitials(u.name)}</span>
        <span>{u.name}</span>
        <span>{u.email}</span>
        <span>{u.role}</span>
        <span>{new Date(u.creationAt).toLocaleString()}</span>
      </div>
    </div>
  );
};
