'use client';

import type { ComponentProps, ReactNode } from 'react';

import { UserRound } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { AvatarBadge } from './components/AvatarBadge';
import { AvatarFallback } from './components/AvatarFallback';
import { AvatarRoot } from './components/AvatarRoot';

const avatarPlaceholderIcon = (
  <UserRound
    className="size-[55%] shrink-0 text-muted-foreground"
    aria-hidden
  />
);

const avatarShellClassName = cn(
  'flex size-full items-center justify-center rounded-full bg-muted',
);

export type AvatarProps = Omit<
  ComponentProps<typeof AvatarRoot>,
  'children'
> & {
  src?: string;
  alt?: string;
  badge?: ReactNode;
};

export function Avatar({
  src,
  alt,
  badge,
  className,
  ...rootProps
}: AvatarProps) {
  return (
    <AvatarRoot className={className} {...rootProps}>
      {src != null && src !== '' ? (
        <AppImage
          src={src}
          alt={alt ?? ''}
          className="aspect-square size-full rounded-full object-cover"
          fallback={
            <Skeleton className="size-full rounded-full bg-muted" aria-hidden />
          }
          errorFallback={
            <div className={avatarShellClassName}>{avatarPlaceholderIcon}</div>
          }
        />
      ) : (
        <AvatarFallback>{avatarPlaceholderIcon}</AvatarFallback>
      )}
      {badge != null ? <AvatarBadge>{badge}</AvatarBadge> : null}
    </AvatarRoot>
  );
}
