import { createRHFSelect, createRHFTextField } from '@/shared/lib/form';

import { profileEditFormSchema } from './schema';

export const ProfileEditEmailField = createRHFTextField(
  profileEditFormSchema,
  'email',
);
export const ProfileEditNameField = createRHFTextField(
  profileEditFormSchema,
  'name',
);
export const ProfileEditAvatarField = createRHFTextField(
  profileEditFormSchema,
  'avatar',
);
export const ProfileEditRoleField = createRHFSelect(
  profileEditFormSchema,
  'role',
);
