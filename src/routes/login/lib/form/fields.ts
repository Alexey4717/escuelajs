import { createRHFTextField } from '@/shared/lib/form';

import { loginFormSchema } from './scheme';

export const LoginEmailField = createRHFTextField(loginFormSchema, 'email');

export const LoginPasswordField = createRHFTextField(
  loginFormSchema,
  'password',
);
