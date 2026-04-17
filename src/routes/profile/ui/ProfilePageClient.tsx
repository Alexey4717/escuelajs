'use client';

import dynamic from 'next/dynamic';

import { ProfileLoadPage } from './ProfileLoadPage';

const ProfileDynamicRoute = dynamic(
  () => import('./ProfileRoute').then((m) => ({ default: m.ProfileRoute })),
  {
    ssr: false,
    loading: () => <ProfileLoadPage />,
  },
);

export function ProfilePageClient() {
  return <ProfileDynamicRoute />;
}
