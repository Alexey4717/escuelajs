import { type ReactNode } from 'react';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ChangeModeButtonGroup } from './components/ChangeModeButtonGroup';
import { AuthMode } from './types';

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

export const AuthFormShell = ({
  mode,
  title,
  subtitle,
  children,
  footer,
  loginHref,
  registerHref,
}: AuthFormShellProps) => (
  <div className="flex min-h-[min(100dvh,100vh)] flex-col bg-background px-4 py-10 sm:py-14">
    <div className="relative mx-auto my-auto w-full max-w-[380px]">
      <Link
        href={pagesPath.$url().path}
        className="absolute left-0 -top-10 z-10 inline-flex text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to home
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

        <ChangeModeButtonGroup
          mode={mode}
          registerHref={registerHref}
          loginHref={loginHref}
        />

        {children}

        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </div>
  </div>
);
