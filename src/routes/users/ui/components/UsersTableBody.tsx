import type { UsersQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Badge } from '@/shared/ui/Badge/Badge';
import { TableBody, TableCell, TableRow } from '@/shared/ui/Table/Table';
import { Typography } from '@/shared/ui/Typography/Typography';

import { parseUserRole, UserRoleText } from '@/entities/User';

interface UsersTableBodyProps {
  users: UsersQuery['users'];
}

export const UsersTableBody = ({ users }: UsersTableBodyProps) => (
  <TableBody>
    {users.length ? (
      users.map((user) => {
        const role = parseUserRole(user.role);
        const avatarSrc =
          user.avatar != null && user.avatar.trim() !== ''
            ? user.avatar
            : undefined;

        return (
          <TableRow
            key={user.id}
            className="cursor-default border-border hover:bg-transparent"
          >
            <TableCell className="w-16 min-w-16 max-w-16 py-3 pl-4 pr-2 align-middle">
              <Avatar
                src={avatarSrc}
                alt={user?.name ?? ''}
                className="size-9 shrink-0"
              />
            </TableCell>
            <TableCell className="px-4 py-3 whitespace-normal">
              <span className="min-w-0 font-medium text-foreground">
                {user.name}
              </span>
            </TableCell>
            <TableCell className="px-4 py-3">
              <a
                href={`mailto:${user.email}`}
                className="text-sm text-sky-700 underline-offset-2 hover:underline dark:text-sky-400"
              >
                {user.email}
              </a>
            </TableCell>
            <TableCell className="px-4 py-3">
              <Badge
                variant="outline"
                className={cn(
                  'border-transparent font-semibold',
                  role === 'admin'
                    ? 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-100'
                    : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100',
                )}
              >
                {UserRoleText[role]}
              </Badge>
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={4} className="px-4 py-10 text-center">
          <Typography variant="muted">Пользователи пока недоступны.</Typography>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);
