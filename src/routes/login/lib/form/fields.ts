import { createRHFTextField } from '@/shared/lib/form';

import type { LoginFormStateInput } from './scheme';

export const LoginEmailField = createRHFTextField<LoginFormStateInput>({
  name: 'email',
  label: 'Email',
  required: true,
  'data-testid': 'login__input__email',
});

export const LoginPasswordField = createRHFTextField<LoginFormStateInput>({
  name: 'password',
  label: 'Пароль',
  required: true,
  'data-testid': 'login__input__password',
});
