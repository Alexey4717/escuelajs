import { email, string } from 'zod/v4';

export const emailSchema = string()
  .min(1, 'enter email')
  .pipe(email('Incorrect email'));
