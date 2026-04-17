import { input, object, output } from 'zod/v4';

import { emailSchema, passwordSchema } from '@/shared/lib/form';

export const loginFormSchema = object({
  email: emailSchema.meta({
    formField: {
      label: 'Email',
      'data-testid': 'login__input__email',
    },
  }),
  password: passwordSchema.meta({
    formField: {
      label: 'Password',
      'data-testid': 'login__input__password',
    },
  }),
});

export type LoginFormStateInput = input<typeof loginFormSchema>;
export type LoginFormStateOutput = output<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormStateInput = {
  email: '',
  password: '',
};
