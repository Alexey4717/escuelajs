import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/lib/styles/cn';

import { CardAction } from './components/CardAction';
import { CardContent } from './components/CardContent';
import { CardCover } from './components/CardCover';
import { CardDescription } from './components/CardDescription';
import { CardFooter } from './components/CardFooter';
import { CardHeader } from './components/CardHeader';
import { CardRoot } from './components/CardRoot';
import { CardTitle } from './components/CardTitle';
import type { CardSize } from './types';

export type CardProps = Omit<ComponentProps<'div'>, 'title'> & {
  size?: CardSize;
  /** Блок над шапкой: обложка, медиа (картинка на всю ширину) */
  cover?: ReactNode;
  /** Заголовок; вместе с `description` и `action` формирует шапку карточки */
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
};

export const Card = ({
  className,
  size = 'default',
  cover,
  title,
  description,
  action,
  footer,
  children,
  ...props
}: CardProps) => {
  const hasHeader =
    title !== undefined || description !== undefined || action !== undefined;
  const useContentSlot = hasHeader || footer !== undefined;

  return (
    <CardRoot className={className} size={size} {...props}>
      {cover !== undefined ? <CardCover>{cover}</CardCover> : null}
      {hasHeader ? (
        <CardHeader
          className={cn(
            cover !== undefined && 'rounded-t-none border-t border-border',
          )}
        >
          {title !== undefined ? <CardTitle>{title}</CardTitle> : null}
          {description !== undefined ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
          {action !== undefined ? <CardAction>{action}</CardAction> : null}
        </CardHeader>
      ) : null}
      {children !== undefined ? (
        useContentSlot ? (
          <CardContent>{children}</CardContent>
        ) : (
          children
        )
      ) : null}
      {footer !== undefined ? <CardFooter>{footer}</CardFooter> : null}
    </CardRoot>
  );
};
