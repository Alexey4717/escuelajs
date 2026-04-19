'use client';

import { useRef } from 'react';

export const useThrottle = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) => {
  // boolean показывает, можно ли сейчас вызывать событие callback или нет
  const throttlingRef = useRef(false);
  return (...args: Args) => {
    if (!throttlingRef.current) {
      callback(...args);
      throttlingRef.current = true;

      const timeout = setTimeout(() => {
        throttlingRef.current = false;
        clearTimeout(timeout);
      }, delay);
    }
  };
};
