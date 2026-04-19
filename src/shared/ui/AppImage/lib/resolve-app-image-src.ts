import { toProxiedEscuelaRestUrl } from './to-proxied-escuela-rest-url';

export const resolveAppImageSrc = (
  src: string | undefined,
  proxifyEscuelaRest: boolean,
): string => {
  if (src == null || src === '') {
    return '';
  }
  return proxifyEscuelaRest ? toProxiedEscuelaRestUrl(src) : src;
};
