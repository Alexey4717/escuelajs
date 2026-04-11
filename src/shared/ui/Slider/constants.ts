/** Корневой контейнер слайдера (Radix Root). */
export const sliderRootClassName =
  'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col';

/** Дорожка (трек). */
export const sliderTrackClassName =
  'relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1';

/** Заполненный диапазон между ползунками. */
export const sliderRangeClassName =
  'absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full';

/** Ручка (thumb). */
export const sliderThumbClassName =
  'relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50';

/** Значения по умолчанию для `min` / `max`, если не переданы в `Slider`. */
export const DEFAULT_SLIDER_MIN = 0;
export const DEFAULT_SLIDER_MAX = 100;
