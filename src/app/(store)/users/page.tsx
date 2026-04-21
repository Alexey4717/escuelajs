import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UsersDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildPageMetadata } from '@/shared/lib/seo';

import { USERS_LIST_LIMIT, UsersRoute } from '@/routes/users';

const title = 'Users';
const description =
  'Escuela users list: names, emails, and roles. Browse registered accounts.';

/** Кэш RSC с тегом `users`; сброс через `revalidateTag` после мутаций пользователей. */
const USERS_LIST_RSC_REVALIDATE_SECONDS = 120;

const usersFetchContext = {
  fetchOptions: {
    next: {
      tags: [nextCacheTags.users],
      revalidate: USERS_LIST_RSC_REVALIDATE_SECONDS,
    },
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
      <UsersRoute />
    </PreloadQuery>
  );
}
