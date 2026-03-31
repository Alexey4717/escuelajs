import { email, input, object, output, string } from 'zod/v4';

import { passwordSchema } from '@/shared/lib/form';

export const loginFormSchema = object({
  email: string().min(1, 'Введите email').pipe(email('Некорректный email')),
  password: passwordSchema,
});

export type LoginFormStateInput = input<typeof loginFormSchema>;
export type LoginFormStateOutput = output<typeof loginFormSchema>;
