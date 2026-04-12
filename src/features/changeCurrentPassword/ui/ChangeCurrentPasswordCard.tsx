'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

import { useChangeCurrentPasswordSubmitHandler } from '../api/use-change-current-password-submit-handler';
import { ChangeCurrentPasswordField } from '../lib/form/fields';
import {
  changeCurrentPasswordFormDefaultValues,
  changeCurrentPasswordFormSchema,
  ChangeCurrentPasswordFormStateInput,
  ChangeCurrentPasswordFormStateOutput,
} from '../lib/form/scheme';

export function ChangeCurrentPasswordCard() {
  const methods = useForm<
    ChangeCurrentPasswordFormStateInput,
    unknown,
    ChangeCurrentPasswordFormStateOutput
  >({
    resolver: standardSchemaResolver(changeCurrentPasswordFormSchema),
    defaultValues: changeCurrentPasswordFormDefaultValues,
  });
  const { submitChangePassword, loading } =
    useChangeCurrentPasswordSubmitHandler();

  async function handleSubmit({
    password,
  }: ChangeCurrentPasswordFormStateOutput) {
    await submitChangePassword({
      password,
      onSuccess: () => methods.reset(),
    });
  }

  return (
    <Card title="Сменить пароль" className="shadow-sm ring-border/60">
      <Form methods={methods} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <ChangeCurrentPasswordField
              type="password"
              autoComplete="new-password"
              placeholder="Новый пароль"
            />
          </div>
          <Button
            type="submit"
            className="w-full shrink-0 sm:w-auto"
            loading={loading}
            size="lg"
            data-testid="changeCurrentPassword__button__submit"
          >
            {loading ? 'Сохранение' : 'Сохранить'}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
