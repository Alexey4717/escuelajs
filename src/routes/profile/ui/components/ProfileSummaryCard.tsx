import { type ComponentProps } from 'react';

import Link from 'next/link';

import { pagesPath } from '@/shared/routes/$path';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { CardContent } from '@/shared/ui/Card/components/CardContent';
import { CardRoot } from '@/shared/ui/Card/components/CardRoot';
import { Typography } from '@/shared/ui/Typography/Typography';

import { DeleteCurrentUserButton } from '@/features/deleteCurrentUser';

interface ProfileSummaryCardProps {
  userId: string;
  name: string;
  email: string;
  roleLabel: string;
  roleBadgeVariant: NonNullable<ComponentProps<typeof Badge>['variant']>;
  avatarSrc: string;
}

export const ProfileSummaryCard = ({
  userId,
  name,
  email,
  roleLabel,
  roleBadgeVariant,
  avatarSrc,
}: ProfileSummaryCardProps) => {
  return (
    <CardRoot className="gap-0 py-0 shadow-sm ring-border/60">
      <CardContent className="flex flex-col items-center gap-5 pb-6 pt-6">
        <Avatar
          className="size-24"
          src={avatarSrc.trim() !== '' ? avatarSrc : undefined}
          alt={name}
        />
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <Typography variant="h3" component="p" className="text-balance">
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className="text-muted-foreground"
          >
            {email}
          </Typography>
          <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href={pagesPath.profile.edit.$url().path}>Редактировать</Link>
          </Button>
          <DeleteCurrentUserButton email={email} userId={userId} />
        </div>
      </CardContent>
    </CardRoot>
  );
};
