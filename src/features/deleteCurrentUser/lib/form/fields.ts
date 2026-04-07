import { createRHFTextField } from '@/shared/lib/form';

import { deleteCurrentUserFormSchema } from './scheme';

export const DeleteCurrentUserReasonField = createRHFTextField(
  deleteCurrentUserFormSchema,
  'reason',
);
