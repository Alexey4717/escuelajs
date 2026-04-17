import { type ComponentProps } from 'react';

import { Loader2Icon } from 'lucide-react';

import { cn } from '../../lib/styles/cn';

/**
 * Вращение через класс `spinner-root` в globals.css (вне @layer), а не `animate-spin`:
 * неслойный сброс анимаций при prefers-reduced-motion иначе перебивает утилиты Tailwind.
 */
export const Spinner = ({ className, ...props }: ComponentProps<'svg'>) => (
  <span className="spinner-root" role="status" aria-label="Loading">
    <Loader2Icon aria-hidden className={cn('size-4', className)} {...props} />
  </span>
);
