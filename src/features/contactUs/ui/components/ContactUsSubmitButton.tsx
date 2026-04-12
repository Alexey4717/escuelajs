'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/Button/Button';

import type { ContactUsFormStateInput } from '../../lib/form/scheme';

export const ContactUsSubmitButton = () => {
  const { formState } = useFormContext<ContactUsFormStateInput>();
  const busy = formState.isSubmitting;

  return (
    <Button
      type="submit"
      loading={busy}
      data-testid="contact-us__button__submit"
    >
      {busy ? 'Отправка' : 'Отправить'}
    </Button>
  );
};
