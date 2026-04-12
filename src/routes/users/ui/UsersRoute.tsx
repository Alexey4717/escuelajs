'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { UsersDocument } from '@/shared/api/generated/graphql';
import { Table } from '@/shared/ui/Table/Table';

import { Page } from '@/widgets/Page';

import { USERS_LIST_LIMIT } from '../lib/constants';
import { UsersTableBody } from './components/UsersTableBody';
import { UsersTableHeader } from './components/UsersTableHeader';

export const UsersRoute = () => {
  const { data } = useSuspenseQuery(UsersDocument, {
    variables: { limit: USERS_LIST_LIMIT },
  });

  return (
    <Page className="space-y-6" heading="Пользователи">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table
          containerClassName="rounded-xl"
          className="min-w-[640px] sm:min-w-0"
        >
          <UsersTableHeader />
          <UsersTableBody users={data.users} />
        </Table>
      </div>
    </Page>
  );
};
