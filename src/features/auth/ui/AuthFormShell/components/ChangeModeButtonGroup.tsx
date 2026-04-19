import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonGroup } from '@/shared/ui/ButtonGroup/ButtonGroup';

import { AuthMode } from '../types';

const authTabButtonClassName =
  'min-w-0 flex-1 justify-center text-center text-[13px]';
/** Активная вкладка — не ссылка, курсор не «рука» */
const authTabActiveButtonClassName = `${authTabButtonClassName} cursor-default`;

interface ChangeModeButtonGroupProps {
  mode: AuthMode;
  loginHref?: string;
  registerHref?: string;
}

export const ChangeModeButtonGroup = ({
  mode,
  loginHref = pagesPath.login.$url().path,
  registerHref = pagesPath.register.$url().path,
}: ChangeModeButtonGroupProps) => (
  <ButtonGroup className="mb-5 w-full overflow-hidden rounded-md border border-border">
    {mode === 'login' ? (
      <>
        <Button
          variant="default"
          size="sm"
          className={authTabActiveButtonClassName}
          asChild
        >
          <span aria-current="page">Sign in</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={authTabButtonClassName}
          asChild
        >
          <Link href={registerHref} prefetch>
            Sign up
          </Link>
        </Button>
      </>
    ) : (
      <>
        <Button
          variant="outline"
          size="sm"
          className={authTabButtonClassName}
          asChild
        >
          <Link href={loginHref} prefetch>
            Sign in
          </Link>
        </Button>
        <Button
          variant="default"
          size="sm"
          className={authTabActiveButtonClassName}
          asChild
        >
          <span aria-current="page">Sign up</span>
        </Button>
      </>
    )}
  </ButtonGroup>
);
