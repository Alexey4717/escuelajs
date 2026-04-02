import Link from 'next/link';

import { FileQuestion } from 'lucide-react';

import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

export default async function GlobalNotFound() {
  const isLoggedIn = await defineIsLoggedIn();

  return (
    <div className="flex min-h-[min(100dvh,100vh)] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <FileQuestion className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <Typography variant="overline">Ошибка 404</Typography>
          <Typography component="h1" className="text-foreground">
            Такой страницы нет
          </Typography>
          <Typography variant="muted" className="text-pretty leading-relaxed">
            Ссылка устарела, адрес набран с опечаткой или страница перенесена.
            Проверьте URL или вернитесь на главную.
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={isLoggedIn ? '/profile' : '/login'}>
              {isLoggedIn ? 'Профиль' : 'Войти'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
