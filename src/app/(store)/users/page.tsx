import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UsersDocument } from '@/shared/api/generated/graphql';
import { getAppOrigin } from '@/shared/lib/app-origin';
import { pagesPath } from '@/shared/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

import { USERS_LIST_LIMIT, UsersRoute } from '@/routes/users';

const USERS_REVALIDATE_SEC = 120;

const title = 'Пользователи';
const description =
  'Список пользователей Escuela: имена, email, роли. Поиск по каталогу учётных записей.';

/**
 * Список пользователей на API меняется чаще, чем справочники (добавления несколько раз в день).
 * Короткий ISR + тег `users` даёт актуальные данные для SEO и снижает нагрузку; при навигации
 * в клиенте Apollo дополнительно подтягивает свежие данные (`cache-and-network` по умолчанию).
 */
const usersFetchContext = {
  fetchOptions: {
    next: {
      revalidate: USERS_REVALIDATE_SEC,
      tags: ['users'],
    },
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const base = getAppOrigin();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${base}${pagesPath.users.$url().pathname}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function UsersPage() {
  return (
    <PreloadQuery
      query={UsersDocument}
      variables={{ limit: USERS_LIST_LIMIT }}
      context={usersFetchContext}
    >
      <Suspense
        fallback={
          <Typography variant="muted">Загрузка пользователей…</Typography>
        }
      >
        <UsersRoute />
      </Suspense>
    </PreloadQuery>
  );
}
