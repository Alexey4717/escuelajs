'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { isUnauthorized } from '@/shared/api/apollo-client';
import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { pagesPath } from '@/shared/config/routes/$path';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUser } from '@/entities/Session';
import { getRoleText, parseUserRole } from '@/entities/User';

import { ChangeCurrentPasswordCard } from '@/features/changeCurrentPassword';
import { OnboardingProfileSection } from '@/features/onboarding';

import { Page } from '@/widgets/Page';

import { ProfileAccountDataCard } from './components/ProfileAccountDataCard';
import { ProfileSummaryCard } from './components/ProfileSummaryCard';
import { ProfileLoadPage } from './ProfileLoadPage';

export const ProfileRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, loading } = useCurrentUser();

  useEffect(() => {
    if (!error) return;
    if (isUnauthorized(error)) {
      // #region agent log
      emitDebugSessionLog({
        hypothesisId: 'H7',
        location: 'ProfileRoute.tsx',
        message: 'client redirect: GraphQL unauthorized',
        data: { pathname },
      });
      // #endregion
      router.replace(loginPageUrlWithFrom(pathname));
    }
  }, [error, pathname, router]);

  const logout = async () => {
    await clearAuthSession();
    router.push(pagesPath.$url().path);
    router.refresh();
  };

  if (loading) {
    return <ProfileLoadPage />;
  }

  if (error) {
    if (isUnauthorized(error)) {
      // Перенаправление на вход
      return <ProfileLoadPage />;
    }
    return (
      <Page narrow heading="Profile">
        <div className="space-y-4">
          <Typography variant="body1" component="p">
            Failed to load profile
          </Typography>
          <Typography variant="body2" component="p">
            {error.message}
          </Typography>
          <Link href={pagesPath.$url().path}>Go to home</Link>
          <Button type="button" variant="outline" onClick={logout}>
            Sign out
          </Button>
        </div>
      </Page>
    );
  }

  if (!user) {
    return null;
  }

  const u = user;
  const role = parseUserRole(u.role);
  const roleLabel = getRoleText(u.role) ?? u.role;
  const roleBadgeVariant = role === 'admin' ? 'destructive' : 'secondary';

  return (
    <Page narrow heading="Profile">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-start">
        <ProfileSummaryCard
          userId={u.id}
          name={u.name}
          email={u.email}
          roleLabel={roleLabel}
          roleBadgeVariant={roleBadgeVariant}
          avatarSrc={u.avatar}
        />

        <div className="flex min-w-0 flex-col gap-6">
          <ProfileAccountDataCard
            id={u.id}
            name={u.name}
            email={u.email}
            creationAt={u.creationAt}
            updatedAt={u.updatedAt}
            roleLabel={roleLabel}
            roleBadgeVariant={roleBadgeVariant}
          />
          <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-start">
            <ChangeCurrentPasswordCard />
            <OnboardingProfileSection />
          </div>
        </div>
      </div>
    </Page>
  );
};
