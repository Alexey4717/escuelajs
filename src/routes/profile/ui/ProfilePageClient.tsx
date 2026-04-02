'use client';

import dynamic from 'next/dynamic';

const ProfileDynamicRoute = dynamic(
  () => import('./ProfileRoute').then((m) => ({ default: m.ProfileRoute })),
  {
    ssr: false,
    loading: () => <div>Загрузка профиля…</div>,
  },
);

type ProfilePageClientProps = {
  userId: string;
};

export function ProfilePageClient({ userId }: ProfilePageClientProps) {
  return <ProfileDynamicRoute userId={userId} />;
}
