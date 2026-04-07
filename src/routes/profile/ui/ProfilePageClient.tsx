'use client';

import dynamic from 'next/dynamic';

const ProfileDynamicRoute = dynamic(
  () => import('./ProfileRoute').then((m) => ({ default: m.ProfileRoute })),
  {
    ssr: false,
    loading: () => <div>Загрузка профиля…</div>,
  },
);

export function ProfilePageClient() {
  return <ProfileDynamicRoute />;
}
