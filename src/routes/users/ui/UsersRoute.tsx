'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { UsersDocument } from '@/shared/api/generated/graphql';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Table } from '@/shared/ui/Table/Table';

import { useOnboardingSessionStore } from '@/features/onboarding';

import { Page } from '@/widgets/Page';

import { USERS_LIST_LIMIT } from '../lib/constants';
import { UsersTableBody } from './components/UsersTableBody';
import { UsersTableHeader } from './components/UsersTableHeader';

export const UsersRoute = () => {
  const isOnboardingDemoActive = useOnboardingSessionStore(
    (s) => s.isDemoActive,
  );
  const { data } = useSuspenseQuery(UsersDocument, {
    variables: { limit: USERS_LIST_LIMIT },
    fetchPolicy: isOnboardingDemoActive ? 'cache-first' : undefined,
  });

  return (
    <Page className="space-y-6" heading="Пользователи">
      <div
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        data-onboarding={ONBOARDING_TARGET_IDS.usersTable}
      >
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
