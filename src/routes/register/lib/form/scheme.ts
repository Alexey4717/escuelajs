import { input, object, output, string } from 'zod/v4';

import { emailSchema, passwordSchema } from '@/shared/lib/form';

export const registerFormSchema = object({
  name: string()
    .trim()
    .min(2, 'Minimum 2 characters')
    .meta({
      formField: {
        label: 'Name',
        'data-testid': 'register__input__name',
      },
    }),
  email: emailSchema.meta({
    formField: {
      label: 'Email',
      'data-testid': 'register__input__email',
    },
  }),
  password: passwordSchema.meta({
    formField: {
      label: 'Password',
      'data-testid': 'register__input__password',
    },
  }),
  confirmPassword: string().meta({
    formField: {
      label: 'Confirm password',
      'data-testid': 'register__input__confirm-password',
    },
  }),
}).superRefine((data, ctx) => {
  if (!passwordSchema.safeParse(data.password).success) {
    return;
  }
  if (!data.confirmPassword.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password cannot be empty',
      path: ['confirmPassword'],
    });
    return;
  }
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export type RegisterFormStateInput = input<typeof registerFormSchema>;
export type RegisterFormStateOutput = output<typeof registerFormSchema>;

export const registerFormDefaultValues: RegisterFormStateOutput = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
