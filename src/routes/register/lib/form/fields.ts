import { createRHFTextField } from '@/shared/lib/form';

import { registerFormSchema } from './scheme';

export const RegisterNameField = createRHFTextField(registerFormSchema, 'name');

export const RegisterEmailField = createRHFTextField(
  registerFormSchema,
  'email',
);

export const RegisterPasswordField = createRHFTextField(
  registerFormSchema,
  'password',
);

export const RegisterConfirmPasswordField = createRHFTextField(
  registerFormSchema,
  'confirmPassword',
);
