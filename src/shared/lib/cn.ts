import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Склеивает условные классы и корректно мержит конфликтующие утилиты Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
