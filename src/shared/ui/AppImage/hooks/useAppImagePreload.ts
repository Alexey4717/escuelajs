import { useLayoutEffect, useState } from 'react';

import { resolveAppImageSrc } from '../lib/resolve-app-image-src';

type UseAppImagePreloadResult = {
  isLoading: boolean;
  hasError: boolean;
  resolvedSrc: string;
};

export const useAppImagePreload = (
  src: string | undefined,
  proxifyEscuelaRest: boolean,
  disablePreload: boolean,
): UseAppImagePreloadResult => {
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(src && !disablePreload),
  );
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = resolveAppImageSrc(src, proxifyEscuelaRest);

  /* eslint-disable react-hooks/set-state-in-effect --
   * Предзагрузка через `Image()` до paint без лишней DOM-обёртки вокруг `<img>` (важно для absolute/flex).
   */
  useLayoutEffect(() => {
    if (disablePreload) {
      setIsLoading(false);
      setHasError(false);
      return;
    }
    if (!src) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setHasError(false);

    const url = resolveAppImageSrc(src, proxifyEscuelaRest);
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) {
        setIsLoading(false);
      }
    };
    probe.onerror = () => {
      if (!cancelled) {
        setIsLoading(false);
        setHasError(true);
      }
    };
    probe.src = url;

    return () => {
      cancelled = true;
    };
  }, [disablePreload, src, proxifyEscuelaRest]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { isLoading, hasError, resolvedSrc };
};
