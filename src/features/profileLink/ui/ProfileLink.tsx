'use client';

import Link from 'next/link';

import { skipToken, useQuery } from '@apollo/client/react';

import { UserPreviewDocument } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { getRoleText } from '@/entities/User';

const profileLinkClassName = cn(
  'flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-white/12 py-1.5 pr-2.5 pl-1',
  'text-inherit transition-colors',
  'hover:bg-white/10',
);

interface ProfileLinkProps {
  userId: string | null;
}

function ProfileLinkFallback() {
  return (
    <Link href="/profile" className={profileLinkClassName} aria-label="Профиль">
      <span
        className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-accent text-[11px] font-semibold text-accent-foreground"
        aria-hidden
      >
        П
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-[12px] opacity-80">
        Профиль
      </span>
    </Link>
  );
}

export function ProfileLink({ userId }: ProfileLinkProps) {
  const { data, loading } = useQuery(
    UserPreviewDocument,
    userId
      ? {
          variables: { id: userId },
        }
      : skipToken,
  );

  if (!userId) {
    return <ProfileLinkFallback />;
  }

  const user = data?.user;
  const avatarSrc =
    user?.avatar != null && user.avatar.trim() !== '' ? user.avatar : undefined;
  const roleText = getRoleText(user?.role);

  return (
    <Link
      href="/profile"
      className={cn(profileLinkClassName, 'group')}
      aria-label={user ? `Профиль: ${user.name}` : 'Профиль'}
    >
      <Avatar
        className="size-[26px] shrink-0 self-center after:border-0"
        src={avatarSrc}
        alt={user?.name ?? ''}
        fallback={
          loading ? (
            <Skeleton
              className="size-full rounded-full bg-white/20"
              aria-hidden
            />
          ) : (
            <span className="text-[11px] font-semibold">
              {user ? user.name?.[0] : '?'}
            </span>
          )
        }
      />
      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="flex flex-col gap-1.5 py-0.5">
            <Skeleton className="h-3 w-full bg-white/20" aria-hidden />
            <Skeleton className="h-2.5 w-2/3 bg-white/20" aria-hidden />
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
                {user?.name ?? 'Профиль'}
              </span>
              <span
                className={cn(
                  'pointer-events-none absolute left-0 top-0 flex max-w-full items-center truncate text-[12px] opacity-0 transition-opacity',
                  'group-hover:opacity-90',
                )}
              >
                Профиль
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
}
