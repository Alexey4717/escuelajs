import { createRHFTextField } from '@/shared/lib/form';

import type { ChangeCurrentPasswordFormSchema } from './scheme';

export const createChangeCurrentPasswordRhfFields = (
  schema: ChangeCurrentPasswordFormSchema,
) => ({
  CurrentPasswordField: createRHFTextField(schema, 'currentPassword'),
  NewPasswordField: createRHFTextField(schema, 'password'),
});
