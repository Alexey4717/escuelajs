'use client';

import type { ComponentProps, ReactNode } from 'react';

import { AvatarBadge } from './components/AvatarBadge';
import { AvatarFallback } from './components/AvatarFallback';
import { AvatarImage } from './components/AvatarImage';
import { AvatarRoot } from './components/AvatarRoot';

export type AvatarProps = Omit<
  ComponentProps<typeof AvatarRoot>,
  'children'
> & {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  badge?: ReactNode;
};

export function Avatar({
  src,
  alt,
  fallback,
  badge,
  className,
  ...rootProps
}: AvatarProps) {
  return (
    <AvatarRoot className={className} {...rootProps}>
      {src != null && src !== '' ? (
        <AvatarImage src={src} alt={alt ?? ''} />
      ) : null}
      <AvatarFallback>{fallback}</AvatarFallback>
      {badge != null ? <AvatarBadge>{badge}</AvatarBadge> : null}
    </AvatarRoot>
  );
}
