import { Suspense } from 'react';

import { LoginRoute } from '@/routes/login';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Загрузка…</div>}>
      <LoginRoute />
    </Suspense>
  );
}
