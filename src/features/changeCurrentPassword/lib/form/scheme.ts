import { input, object, output } from 'zod/v4';

import { passwordSchema } from '@/shared/lib/form/schemas/password';

export function createChangeCurrentPasswordFormSchema(options: {
  profilePassword: string | null;
}) {
  return object({
    currentPassword: passwordSchema.meta({
      formField: {
        label: 'Текущий пароль',
        'data-testid': 'changeCurrentPassword__input__currentPassword',
      },
    }),
    password: passwordSchema.meta({
      formField: {
        label: 'Новый пароль',
        'data-testid': 'changeCurrentPassword__input__password',
      },
    }),
  }).superRefine((data, ctx) => {
    if (data.currentPassword === data.password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Новый пароль должен отличаться от текущего',
        path: ['password'],
      });
      return;
    }

    if (!options.profilePassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Данные профиля ещё не загружены',
        path: ['currentPassword'],
      });
      return;
    }

    if (data.currentPassword !== options.profilePassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Неверный текущий пароль',
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
