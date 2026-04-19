'use client';

import { DEFAULT_APP_IMAGE_ALT } from './constants';
import { useAppImagePreload } from './hooks/useAppImagePreload';
import type { AppImageProps } from './types';
import { AppImageDefaultSkeleton } from './ui/AppImageDefaultSkeleton';
import { AppImageStateSlot } from './ui/AppImageStateSlot';

export type { AppImageProps } from './types';

/**
 * Обёртка над нативным `<img>` для медиа Escuela REST, отдаваемых через BFF на том же origin.
 *
 * **Зачем:** публичный API Escuela отвечает с `Cross-Origin-Resource-Policy: same-origin`, из‑за чего
 * браузер не покажет картинку с чужого origin в обычном `<img>`. Функция `toProxiedEscuelaRestUrl`
 * переписывает URL на `/api/escuela-rest/…`, чтобы запрос шёл на ваш Next.js и дальше проксировался
 * на upstream — для `<img>` это тот же origin, CORP не мешает.
 *
 * **Почему не `next/image`:** оптимизатор и loader по умолчанию тянут оригинальный URL с сервера Next/Vercel;
 * без отдельного кастомного loader/proxy вы снова упираетесь в те же ограничения CORP либо в
 * необходимость дублировать прокси-логику в конфиге изображений. Нативный `<img>` с уже
 * проксированным same-origin URL предсказуем и проще сопровождать для этого кейса.
 *
 * Пока ресурс не подтверждён через предзагрузку, показывается `fallback` или встроенный скелетон;
 * при ошибке — `errorFallback`, иначе снова `fallback` или скелетон.
 */
export const AppImage = ({
  className,
  src,
  alt = DEFAULT_APP_IMAGE_ALT,
  proxifyEscuelaRest = true,
  disablePreload = false,
  fallback,
  disableDefaultLoadingSkeleton = false,
  errorFallback,
  ...imgProps
}: AppImageProps) => {
  const { isLoading, hasError, resolvedSrc } = useAppImagePreload(
    src,
    proxifyEscuelaRest,
    disablePreload,
  );

  if (!src) {
    return null;
  }

  if (isLoading) {
    if (fallback !== undefined) {
      return (
        <AppImageStateSlot className={className} busy>
          {fallback}
        </AppImageStateSlot>
      );
    }
    if (!disableDefaultLoadingSkeleton) {
      return (
        <AppImageStateSlot className={className} busy>
          <AppImageDefaultSkeleton />
        </AppImageStateSlot>
      );
    }
  }

  if (hasError) {
    if (errorFallback !== undefined) {
      return (
        <AppImageStateSlot className={className}>
          {errorFallback}
        </AppImageStateSlot>
      );
    }
    if (fallback !== undefined) {
      return (
        <AppImageStateSlot className={className}>{fallback}</AppImageStateSlot>
      );
    }
    return (
      <AppImageStateSlot className={className}>
        <AppImageDefaultSkeleton />
      </AppImageStateSlot>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- намеренно нативный img; см. JSDoc модуля.
    <img className={className} src={resolvedSrc} alt={alt} {...imgProps} />
  );
};
