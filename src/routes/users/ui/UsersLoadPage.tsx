'use client';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/Table/Table';

import { Page } from '@/widgets/Page';

import { UsersTableHeader } from './components/UsersTableHeader';

const usersSkeletonRows = Array.from({ length: 6 }, (_, index) => index);

export const UsersLoadPage = () => {
  return (
    <Page heading="Пользователи">
      <div
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        aria-hidden
      >
        <Table
          containerClassName="rounded-xl"
          className="min-w-[640px] sm:min-w-0"
        >
          <UsersTableHeader />
          <TableBody>
            {usersSkeletonRows.map((item) => (
              <TableRow
                key={item}
                className="cursor-default border-border hover:bg-transparent"
              >
                <TableCell className="w-16 min-w-16 max-w-16 py-3 pl-4 pr-2 align-middle">
                  <Skeleton className="size-9 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-36 rounded-md" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-52 rounded-md" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-32 rounded-md" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
};
