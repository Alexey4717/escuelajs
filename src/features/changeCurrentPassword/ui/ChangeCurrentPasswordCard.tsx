'use client';

import { useMemo } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

import { useCurrentUserPassword } from '@/entities/Session';

import { useChangeCurrentPasswordSubmitHandler } from '../api/use-change-current-password-submit-handler';
import { createChangeCurrentPasswordRhfFields } from '../lib/form/fields';
import {
  changeCurrentPasswordFormDefaultValues,
  ChangeCurrentPasswordFormStateInput,
  ChangeCurrentPasswordFormStateOutput,
  createChangeCurrentPasswordFormSchema,
} from '../lib/form/scheme';

interface ChangeCurrentPasswordFormInnerProps {
  profilePassword: string | null;
  userLoading: boolean;
}

function ChangeCurrentPasswordFormInner({
  profilePassword,
  userLoading,
}: ChangeCurrentPasswordFormInnerProps) {
  const formSchema = useMemo(
    () => createChangeCurrentPasswordFormSchema({ profilePassword }),
    [profilePassword],
  );

  const { CurrentPasswordField, NewPasswordField } = useMemo(
    () => createChangeCurrentPasswordRhfFields(formSchema),
    [formSchema],
  );

  const methods = useForm<
    ChangeCurrentPasswordFormStateInput,
    unknown,
    ChangeCurrentPasswordFormStateOutput
  >({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: changeCurrentPasswordFormDefaultValues,
  });
  const { submitChangePassword, loading } =
    useChangeCurrentPasswordSubmitHandler();

  const fieldsDisabled = userLoading || !profilePassword;

  async function handleSubmit({
    password,
  }: ChangeCurrentPasswordFormStateOutput) {
    await submitChangePassword({
      password,
      onSuccess: () => methods.reset(changeCurrentPasswordFormDefaultValues),
    });
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CurrentPasswordField
            type="password"
            autoComplete="current-password"
            placeholder="Текущий пароль"
            disabled={fieldsDisabled}
          />
          <NewPasswordField
            type="password"
            autoComplete="new-password"
            placeholder="Новый пароль"
            disabled={fieldsDisabled}
          />
        </div>
        <Button
          type="submit"
          className="w-full shrink-0 sm:w-auto"
          loading={loading}
          disabled={fieldsDisabled}
          size="lg"
          data-testid="changeCurrentPassword__button__submit"
        >
          {loading ? 'Сохранение' : 'Сохранить'}
        </Button>
      </div>
    </Form>
  );
}

export function ChangeCurrentPasswordCard() {
  const {
    userId,
    loading: userLoading,
    profilePassword,
  } = useCurrentUserPassword();

  const formInstanceKey = `${userId ?? ''}:${profilePassword ?? 'pending'}`;

  return (
    <Card title="Сменить пароль" className="shadow-sm ring-border/60">
      <ChangeCurrentPasswordFormInner
        key={formInstanceKey}
        profilePassword={profilePassword}
        userLoading={userLoading}
      />
    </Card>
  );
}
