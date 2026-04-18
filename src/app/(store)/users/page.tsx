import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UsersDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { buildPageMetadata } from '@/shared/lib/seo';

import { USERS_LIST_LIMIT, UsersLoadPage, UsersRoute } from '@/routes/users';

const title = 'Users';
const description =
  'Escuela users list: names, emails, and roles. Browse registered accounts.';

/**
 * SSR no-store: список пользователей всегда запрашивается заново на сервере,
 * без сохранения результата в Next Data Cache.
 */
const usersFetchContext = {
  fetchOptions: {
    cache: 'no-store',
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title,
    description,
    path: pagesPath.users.$url().pathname,
  });
}

export default function UsersPage() {
  return (
    <PreloadQuery
      query={UsersDocument}
      variables={{ limit: USERS_LIST_LIMIT }}
      errorPolicy="all"
      context={usersFetchContext}
    >
      <Suspense fallback={<UsersLoadPage />}>
        <UsersRoute />
      </Suspense>
    </PreloadQuery>
  );
}
