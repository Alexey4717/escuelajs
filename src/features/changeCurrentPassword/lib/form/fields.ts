import { createRHFTextField } from '@/shared/lib/form';

import { changeCurrentPasswordFormSchema } from './scheme';

export const ChangeCurrentPasswordField = createRHFTextField(
  changeCurrentPasswordFormSchema,
  'password',
);
