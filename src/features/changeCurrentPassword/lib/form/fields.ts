import { createRHFTextField } from '@/shared/lib/form';

import type { ChangeCurrentPasswordFormSchema } from './scheme';

export function createChangeCurrentPasswordRhfFields(
  schema: ChangeCurrentPasswordFormSchema,
) {
  return {
    CurrentPasswordField: createRHFTextField(schema, 'currentPassword'),
    NewPasswordField: createRHFTextField(schema, 'password'),
  };
}
