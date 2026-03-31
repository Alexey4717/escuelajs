import { Suspense } from 'react';

import { RegisterRoute } from '@/routes/register';

function RegisterFallback() {
  return (
    <div className="flex min-h-[min(100dvh,100vh)] items-center justify-center bg-background text-muted-foreground">
      Загрузка…
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterRoute />
    </Suspense>
  );
}
