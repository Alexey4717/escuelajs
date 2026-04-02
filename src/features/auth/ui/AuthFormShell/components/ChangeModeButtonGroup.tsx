import Link from 'next/link';

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
  loginHref = '/login',
  registerHref = '/register',
}: ChangeModeButtonGroupProps) => {
  return (
    <ButtonGroup className="mb-5 w-full overflow-hidden rounded-md border border-border">
      {mode === 'login' ? (
        <>
          <Button
            variant="default"
            size="sm"
            className={authTabActiveButtonClassName}
            asChild
          >
            <span aria-current="page">Вход</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={authTabButtonClassName}
            asChild
          >
            <Link href={registerHref} prefetch>
              Регистрация
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
              Вход
            </Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            className={authTabActiveButtonClassName}
            asChild
          >
            <span aria-current="page">Регистрация</span>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};
