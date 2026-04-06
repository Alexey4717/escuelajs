'use client';

import { useId } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form } from '@/shared/ui/Form/Form';
import { Typography } from '@/shared/ui/Typography/Typography';

import {
  ContactUsEmailField,
  ContactUsMessageField,
  ContactUsNameField,
} from '../lib/form/fields';
import {
  contactUsFormDefaultValues,
  contactUsFormSchema,
  type ContactUsFormStateInput,
  type ContactUsFormStateOutput,
} from '../lib/form/scheme';
import { ContactUsSubmitButton } from './components/ContactUsSubmitButton';

export const ContactUsForm = () => {
  const formId = useId();

  const methods = useForm<
    ContactUsFormStateInput,
    unknown,
    ContactUsFormStateOutput
  >({
    resolver: standardSchemaResolver(contactUsFormSchema),
    defaultValues: contactUsFormDefaultValues,
  });

  const onSubmit: SubmitHandler<ContactUsFormStateOutput> = () => {
    // Имитация отправки сообщения
    toast.success('Сообщение отправлено');
    methods.reset();
  };

  return (
    <section aria-labelledby={`${formId}-heading`} className="mt-16 space-y-6">
      <div>
        <Typography id={`${formId}-heading`} variant="h2" gutterBottom>
          Связаться с нами
        </Typography>
        <Typography variant="muted">
          Оставьте сообщение — мы ответим на указанный email.
        </Typography>
      </div>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="max-w-xl space-y-4 rounded-xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm"
      >
        <ContactUsNameField
          autoComplete="name"
          placeholder="Как к вам обращаться"
        />
        <ContactUsEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <ContactUsMessageField
          rows={4}
          placeholder="Вопрос по заказу, доставке или ассортименту"
        />
        <ContactUsSubmitButton />
      </Form>
    </section>
  );
};
