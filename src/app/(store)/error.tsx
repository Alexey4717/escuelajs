'use client';

import { useEffect } from 'react';

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

interface StoreErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StoreError({ error, reset }: StoreErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-12 justify-center bg-background py-12">
      <Typography variant="h1">Ошибка загрузки страницы магазина</Typography>
      <div
        className="flex h-100 w-100 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        aria-hidden
      >
        <AlertTriangle className="h-70 w-70" strokeWidth={1.5} />
      </div>
      <Button type="button" onClick={() => reset()}>
        Попробовать снова
      </Button>
    </div>
  );
}
