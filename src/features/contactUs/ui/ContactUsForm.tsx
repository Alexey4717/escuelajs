'use client';

import { useId } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
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
    toast.success('Message sent');
    methods.reset();
  };

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className="mt-16 space-y-6"
      data-onboarding={ONBOARDING_TARGET_IDS.homeContactForm}
    >
      <div>
        <Typography id={`${formId}-heading`} variant="h2" gutterBottom>
          Contact us
        </Typography>
        <Typography variant="muted">
          Leave a message and we&apos;ll reply to your email.
        </Typography>
      </div>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="max-w-xl space-y-4 rounded-xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm"
      >
        <ContactUsNameField
          autoComplete="name"
          placeholder="How should we address you?"
        />
        <ContactUsEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <ContactUsMessageField
          rows={4}
          placeholder="Question about your order, delivery, or products"
        />
        <ContactUsSubmitButton />
      </Form>
    </section>
  );
};
