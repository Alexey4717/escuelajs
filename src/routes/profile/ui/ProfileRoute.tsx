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

import { getRoleText, getUserInitials, parseUserRole } from '@/entities/User';

import { Page } from '@/widgets/Page';

import { ProfileAccountDataCard } from './components/ProfileAccountDataCard';
import { ProfileChangePasswordCard } from './components/ProfileChangePasswordCard';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';

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
      <Page narrow className="space-y-6" heading="Профиль">
        <Typography variant="body1" component="div">
          Загрузка профиля…
        </Typography>
      </Page>
    );
  }

  if (error) {
    if (isUnauthorized(error)) {
      return (
        <Page narrow className="space-y-6" heading="Профиль">
          <Typography variant="body1" component="p">
            Перенаправление на вход…
          </Typography>
        </Page>
      );
    }
    return (
      <Page narrow className="space-y-6" heading="Профиль">
        <div className="space-y-4">
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
      </Page>
    );
  }

  if (!data) {
    return null;
  }

  const u = data.user;
  const initials = getUserInitials(u.name);
  const role = parseUserRole(u.role);
  const roleLabel = getRoleText(u.role) ?? u.role;
  const roleBadgeVariant = role === 'admin' ? 'destructive' : 'secondary';

  return (
    <Page narrow className="space-y-6" heading="Профиль">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-start">
        <ProfileSummaryCard
          userId={u.id}
          initials={initials}
          name={u.name}
          email={u.email}
          roleLabel={roleLabel}
          roleBadgeVariant={roleBadgeVariant}
        />

        <div className="flex min-w-0 flex-col gap-6">
          <ProfileAccountDataCard
            id={u.id}
            name={u.name}
            email={u.email}
            roleLabel={roleLabel}
            roleBadgeVariant={roleBadgeVariant}
          />
          <ProfileChangePasswordCard />
        </div>
      </div>
    </Page>
  );
};
