import type { ImgHTMLAttributes, ReactNode } from 'react';

export type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /** URL изображения. Пустое значение — ничего не рендерится. */
  src?: string | undefined;
  /**
   * Подменять абсолютный URL Escuela REST на same-origin BFF (`/api/escuela-rest/…`).
   * @defaultValue true
   */
  proxifyEscuelaRest?: boolean;
  /**
   * Плейсхолдер на время предзагрузки (через `Image()`). Если не задан, показывается
   * встроенный скелетон на всю область `className` (см. `disableDefaultLoadingSkeleton`).
   */
  fallback?: ReactNode;
  /** Не показывать встроенный скелетон, если `fallback` не передан. */
  disableDefaultLoadingSkeleton?: boolean;
  /** Содержимое при ошибке загрузки. Если не задано, повторно используется `fallback`, затем скелетон. */
  errorFallback?: ReactNode;
};
