'use client';

import dynamic from 'next/dynamic';

const ProfileDynamicRoute = dynamic(
  () => import('@/routes/profile').then((m) => ({ default: m.ProfileRoute })),
  {
    ssr: false,
    loading: () => <div>Загрузка профиля…</div>,
  },
);

export default function ProfilePage() {
  return <ProfileDynamicRoute />;
}
