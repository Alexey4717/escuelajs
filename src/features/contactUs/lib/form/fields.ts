import { createRHFTextareaField, createRHFTextField } from '@/shared/lib/form';

import { contactUsFormSchema } from './scheme';

export const ContactUsNameField = createRHFTextField(
  contactUsFormSchema,
  'name',
);

export const ContactUsEmailField = createRHFTextField(
  contactUsFormSchema,
  'email',
);

export const ContactUsMessageField = createRHFTextareaField(
  contactUsFormSchema,
  'message',
);
