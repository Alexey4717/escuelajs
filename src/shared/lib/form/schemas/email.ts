import { email, string } from 'zod/v4';

export const emailSchema = string()
  .min(1, 'Введите email')
  .pipe(email('Некорректный email'));
