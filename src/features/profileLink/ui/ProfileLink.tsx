'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { useCurrentUser } from '@/entities/Session';
import { getRoleText } from '@/entities/User';

const profileLinkClassName = cn(
  'flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/20 py-1.5 pr-2.5 pl-1',
  'text-sidebar-foreground transition-colors',
  'hover:bg-sidebar-accent/40',
);

const ProfileLinkFallback = ({ className }: { className?: string }) => (
  <Link
    href={pagesPath.profile.$url().path}
    className={cn(profileLinkClassName, className)}
    aria-label="Profile"
  >
    <span
      className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-accent text-[11px] font-semibold text-accent-foreground"
      aria-hidden
    >
      P
    </span>
    <span className="min-w-0 flex-1 truncate text-left text-[12px] opacity-80">
      Profile
    </span>
  </Link>
);

interface ProfileLinkProps {
  className?: string;
}

export const ProfileLink = ({ className }: ProfileLinkProps) => {
  const { user, loading } = useCurrentUser();

  if (!user) {
    return <ProfileLinkFallback className={className} />;
  }
  const avatarSrc =
    user?.avatar != null && user.avatar.trim() !== '' ? user.avatar : undefined;
  const roleText = getRoleText(user?.role);

  return (
    <Link
      href={pagesPath.profile.$url().path}
      className={cn(profileLinkClassName, 'group', className)}
      aria-label={user ? `Profile: ${user.name}` : 'Profile'}
    >
      <Avatar
        className="size-[26px] shrink-0 self-center after:border-0"
        src={avatarSrc}
        alt={user?.name ?? ''}
      />
      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="flex flex-col gap-1.5 py-0.5">
            <Skeleton
              className="h-3 w-full bg-sidebar-foreground/20"
              aria-hidden
            />
            <Skeleton
              className="h-2.5 w-2/3 bg-sidebar-foreground/20"
              aria-hidden
            />
          </div>
        ) : (
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="relative min-w-0">
              <span
                className={cn(
                  'block truncate text-[12px] leading-tight opacity-90 transition-opacity',
                  'group-hover:pointer-events-none group-hover:opacity-0',
                )}
              >
                {user?.name ?? 'Profile'}
              </span>
              <span
                className={cn(
                  'pointer-events-none absolute left-0 top-0 flex max-w-full items-center truncate text-[12px] opacity-0 transition-opacity',
                  'group-hover:opacity-90',
                )}
              >
                Profile
              </span>
            </div>
            {roleText ? (
              <span className="truncate text-[10px] leading-tight">
                {roleText}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </Link>
  );
};
