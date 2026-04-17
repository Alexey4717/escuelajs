import { input, object, output } from 'zod/v4';

import { passwordSchema } from '@/shared/lib/form/schemas/password';

export function createChangeCurrentPasswordFormSchema(options: {
  profilePassword: string | null;
}) {
  return object({
    currentPassword: passwordSchema.meta({
      formField: {
        label: 'Current password',
        'data-testid': 'changeCurrentPassword__input__currentPassword',
      },
    }),
    password: passwordSchema.meta({
      formField: {
        label: 'New password',
        'data-testid': 'changeCurrentPassword__input__password',
      },
    }),
  }).superRefine((data, ctx) => {
    if (data.currentPassword === data.password) {
      ctx.addIssue({
        code: 'custom',
        message: 'New password must be different from current password',
        path: ['password'],
      });
      return;
    }

    if (!options.profilePassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Profile data is not loaded yet',
        path: ['currentPassword'],
      });
      return;
    }

    if (data.currentPassword !== options.profilePassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Incorrect current password',
        path: ['currentPassword'],
      });
    }
  });
}

export type ChangeCurrentPasswordFormSchema = ReturnType<
  typeof createChangeCurrentPasswordFormSchema
>;
export type ChangeCurrentPasswordFormStateInput =
  input<ChangeCurrentPasswordFormSchema>;
export type ChangeCurrentPasswordFormStateOutput =
  output<ChangeCurrentPasswordFormSchema>;

export const changeCurrentPasswordFormDefaultValues: ChangeCurrentPasswordFormStateOutput =
  {
    currentPassword: '',
    password: '',
  };
