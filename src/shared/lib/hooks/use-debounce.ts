import { useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */
export const useDebounce = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return (...args: Args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
