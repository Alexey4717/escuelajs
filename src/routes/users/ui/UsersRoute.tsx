'use client';

import { useQuery } from '@apollo/client/react';

import { UsersDocument } from '@/shared/api/generated/graphql';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Table } from '@/shared/ui/Table/Table';

import { useOnboardingSessionStore } from '@/features/onboarding';

import { Page } from '@/widgets/Page';

import { USERS_LIST_LIMIT } from '../lib/constants';
import { UsersTableBody } from './components/UsersTableBody';
import { UsersTableHeader } from './components/UsersTableHeader';
import { UsersLoadPage } from './UsersLoadPage';

export const UsersRoute = () => {
  const isAdminOnboardingDemo = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'admin',
  );
  const { data, loading } = useQuery(UsersDocument, {
    variables: { limit: USERS_LIST_LIMIT },
    fetchPolicy: isAdminOnboardingDemo ? 'cache-only' : 'cache-first',
  });
  const users = data?.users ?? [];
  const isInitialLoading = loading && data == null;

  if (isInitialLoading) {
    return <UsersLoadPage />;
  }

  return (
    <Page heading="Users">
      <div
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        data-onboarding={ONBOARDING_TARGET_IDS.usersTable}
      >
        <Table
          containerClassName="rounded-xl"
          className="min-w-[640px] sm:min-w-0"
        >
          <UsersTableHeader />
          <UsersTableBody users={users} />
        </Table>
      </div>
    </Page>
  );
};
