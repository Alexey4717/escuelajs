'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { isUnauthorized } from '@/shared/api/apollo-client';
import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUser } from '@/entities/Session';
import { getRoleText, getUserInitials, parseUserRole } from '@/entities/User';

import { ChangeCurrentPasswordCard } from '@/features/changeCurrentPassword';

import { Page } from '@/widgets/Page';

import { ProfileAccountDataCard } from './components/ProfileAccountDataCard';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';

export const ProfileRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, loading } = useCurrentUser();

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

  if (!user) {
    return null;
  }

  const u = user;
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
          <ChangeCurrentPasswordCard />
        </div>
      </div>
    </Page>
  );
};
