import { Suspense } from 'react';

import { LoginLoadPage, LoginRoute } from '@/routes/login';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoadPage />}>
      <LoginRoute />
    </Suspense>
  );
}
