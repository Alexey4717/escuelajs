import { useMemo } from 'react';

/**
 * Сколько ручек отрисовать: из `value` / `defaultValue` или два ползунка по умолчанию `[min, max]`.
 */
export function useSliderThumbCount(
  value: number[] | undefined,
  defaultValue: number[] | undefined,
  min: number,
  max: number,
): number {
  return useMemo(() => {
    if (Array.isArray(value)) {
      return value.length;
    }
    if (Array.isArray(defaultValue)) {
      return defaultValue.length;
    }
    return [min, max].length;
  }, [value, defaultValue, min, max]);
}
