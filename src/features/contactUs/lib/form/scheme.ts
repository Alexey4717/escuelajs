import { input, object, output, string } from 'zod/v4';

import { emailSchema } from '@/shared/lib/form';

export const contactUsFormSchema = object({
  name: string()
    .min(1, 'Enter your name')
    .meta({
      formField: {
        label: 'Name',
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
    .min(1, 'Enter your message')
    .meta({
      formField: {
        label: 'Message',
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
