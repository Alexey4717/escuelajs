import { type ComponentProps } from 'react';

import { cn } from '@/shared/lib/styles/cn';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { CardContent } from '@/shared/ui/Card/components/CardContent';
import { CardRoot } from '@/shared/ui/Card/components/CardRoot';
import { Typography } from '@/shared/ui/Typography/Typography';

import { DeleteCurrentUserButton } from '@/features/deleteCurrentUser';

type ProfileSummaryCardProps = {
  userId: string;
  initials: string;
  name: string;
  email: string;
  roleLabel: string;
  roleBadgeVariant: NonNullable<ComponentProps<typeof Badge>['variant']>;
};

export const ProfileSummaryCard = ({
  userId,
  initials,
  name,
  email,
  roleLabel,
  roleBadgeVariant,
}: ProfileSummaryCardProps) => {
  return (
    <CardRoot className="gap-0 py-0 shadow-sm ring-border/60">
      <CardContent className="flex flex-col items-center gap-5 pb-6 pt-6">
        <div
          className={cn(
            'flex size-24 shrink-0 items-center justify-center rounded-full',
            'bg-primary text-2xl font-semibold text-primary-foreground',
          )}
          aria-hidden
        >
          {initials}
        </div>
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
          <Button type="button" variant="outline" className="w-full">
            Редактировать
          </Button>
          <DeleteCurrentUserButton email={email} userId={userId} />
        </div>
      </CardContent>
    </CardRoot>
  );
};
