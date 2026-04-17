import { Suspense } from 'react';

import { RegisterLoadPage, RegisterRoute } from '@/routes/register';

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoadPage />}>
      <RegisterRoute />
    </Suspense>
  );
}
