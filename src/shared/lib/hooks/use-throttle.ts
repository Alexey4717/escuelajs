'use client';

import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  // boolean показывает, можно ли сейчас вызывать событие callback или нет
  const throttlingRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (!throttlingRef.current) {
      callback(...args);
      throttlingRef.current = true;

      const timeout = setTimeout(() => {
        throttlingRef.current = false;
        clearTimeout(timeout);
      }, delay);
    }
  };
}
