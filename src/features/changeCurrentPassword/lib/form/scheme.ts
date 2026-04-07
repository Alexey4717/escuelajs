import { input, object, output } from 'zod/v4';

import { passwordSchema } from '@/shared/lib/form/schemas/password';

export const changeCurrentPasswordFormSchema = object({
  password: passwordSchema.meta({
    formField: {
      label: 'Новый пароль',
      'data-testid': 'changeCurrentPassword__input__password',
    },
  }),
});

export type ChangeCurrentPasswordFormStateInput = input<
  typeof changeCurrentPasswordFormSchema
>;
export type ChangeCurrentPasswordFormStateOutput = output<
  typeof changeCurrentPasswordFormSchema
>;

export const changeCurrentPasswordFormDefaultValues: ChangeCurrentPasswordFormStateOutput =
  {
    password: '',
  };
