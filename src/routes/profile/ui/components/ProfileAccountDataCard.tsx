import { type ComponentProps } from 'react';

import { Badge } from '@/shared/ui/Badge/Badge';
import { Card } from '@/shared/ui/Card/Card';

interface ProfileAccountDataCardProps {
  id: string;
  name: string;
  email: string;
  roleLabel: string;
  roleBadgeVariant: NonNullable<ComponentProps<typeof Badge>['variant']>;
}

export const ProfileAccountDataCard = ({
  id,
  name,
  email,
  roleLabel,
  roleBadgeVariant,
}: ProfileAccountDataCardProps) => {
  return (
    <Card title="Данные аккаунта" className="shadow-sm ring-border/60">
      <div className="divide-y divide-border">
        <div className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-muted-foreground">ID</span>
          <span className="font-medium text-foreground sm:text-end">{id}</span>
        </div>
        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-muted-foreground">Имя</span>
          <span className="font-medium text-foreground sm:text-end">
            {name}
          </span>
        </div>
        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-muted-foreground">Email</span>
          <span className="break-all font-medium text-foreground sm:max-w-[min(100%,20rem)] sm:text-end">
            {email}
          </span>
        </div>
        <div className="flex flex-col gap-1 py-3 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-muted-foreground">Роль</span>
          <span className="flex justify-end sm:justify-end">
            <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
          </span>
        </div>
      </div>
    </Card>
  );
};
