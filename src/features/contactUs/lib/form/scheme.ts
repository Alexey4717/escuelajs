import { input, object, output, string } from 'zod/v4';

import { emailSchema } from '@/shared/lib/form';

export const contactUsFormSchema = object({
  name: string()
    .min(1, 'Введите имя')
    .meta({
      formField: {
        label: 'Имя',
        'data-testid': 'contactUs__input__name',
      },
    }),
  email: emailSchema.meta({
    formField: {
      label: 'Email',
      'data-testid': 'contactUs__input__email',
    },
  }),
  message: string()
    .min(1, 'Введите сообщение')
    .meta({
      formField: {
        label: 'Сообщение',
        'data-testid': 'contactUs__input__message',
      },
    }),
});

export type ContactUsFormStateInput = input<typeof contactUsFormSchema>;
export type ContactUsFormStateOutput = output<typeof contactUsFormSchema>;

export const contactUsFormDefaultValues: ContactUsFormStateInput = {
  name: '',
  email: '',
  message: '',
};
