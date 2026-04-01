import { input, object, output, string } from 'zod/v4';

import { emailSchema, passwordSchema } from '@/shared/lib/form';

export const registerFormSchema = object({
  name: string()
    .trim()
    .min(2, 'Минимум 2 символа')
    .meta({
      formField: {
        label: 'Имя',
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
      label: 'Пароль',
      'data-testid': 'register__input__password',
    },
  }),
  confirmPassword: string().meta({
    formField: {
      label: 'Подтверждение пароля',
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
      message: 'Пароль не может быть пустым',
      path: ['confirmPassword'],
    });
    return;
  }
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });
  }
});

export type RegisterFormStateInput = input<typeof registerFormSchema>;
export type RegisterFormStateOutput = output<typeof registerFormSchema>;
