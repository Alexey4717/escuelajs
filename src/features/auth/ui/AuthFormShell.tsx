import { type ReactNode } from 'react';

import Link from 'next/link';

import { Typography } from '@/shared/ui/Typography/Typography';

type AuthMode = 'login' | 'register';

interface AuthFormShellProps {
  mode: AuthMode;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Сохранить query (например `?from=/checkout`) при переключении Вход ↔ Регистрация */
  loginHref?: string;
  registerHref?: string;
}

const tabBase =
  'flex flex-1 cursor-pointer py-2 text-center text-[13px] transition-colors duration-150';
const tabInactive =
  'text-muted-foreground hover:bg-muted/80 hover:text-foreground';

export function AuthFormShell({
  mode,
  title,
  subtitle,
  children,
  footer,
  loginHref = '/login',
  registerHref = '/register',
}: AuthFormShellProps) {
  return (
    <div className="flex min-h-[min(100dvh,100vh)] flex-col bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[380px]">
        <Link
          href="/"
          className="mb-8 inline-flex text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← На главную
        </Link>

        <div className="rounded-[14px] border border-border bg-card p-7 shadow-sm">
          <Typography
            variant="h5"
            component="h1"
            className="font-bold text-foreground"
          >
            {title}
          </Typography>
          <Typography variant="muted" className="mb-5 text-[12px]">
            {subtitle}
          </Typography>

          <div className="mb-5 flex overflow-hidden rounded-md border border-border">
            {mode === 'login' ? (
              <>
                <span
                  className={`${tabBase} bg-primary font-medium text-primary-foreground`}
                >
                  Вход
                </span>
                <Link
                  href={registerHref}
                  className={`${tabBase} ${tabInactive}`}
                  prefetch
                >
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={loginHref}
                  className={`${tabBase} ${tabInactive}`}
                  prefetch
                >
                  Вход
                </Link>
                <span
                  className={`${tabBase} bg-primary font-medium text-primary-foreground`}
                >
                  Регистрация
                </span>
              </>
            )}
          </div>

          {children}

          {footer ? <div className="mt-4">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
