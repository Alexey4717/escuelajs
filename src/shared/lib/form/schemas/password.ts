import { string } from 'zod/v4';

export const passwordSchema = string()
  .min(6, 'Минимум 6 символов')
  .regex(/[A-Z]/, 'Минимум одна большая буква')
  .regex(/[0-9]/, 'Минимум одна цифра');
