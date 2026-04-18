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
      <div className="flex flex-col gap-2">
        <CurrentPasswordField
          type="password"
          autoComplete="current-password"
          placeholder="Current password"
          disabled={fieldsDisabled}
        />
        <NewPasswordField
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          disabled={fieldsDisabled}
        />
        <Button
          type="submit"
          className="w-full shrink-0 self-end mt-4"
          loading={loading}
          disabled={fieldsDisabled}
          size="lg"
          data-testid="changeCurrentPassword__button__submit"
        >
          {loading ? 'Saving' : 'Save'}
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
    <Card
      title="Change password"
      className="min-w-0 h-content flex-1 shadow-sm ring-border/60"
    >
      <ChangeCurrentPasswordFormInner
        key={formInstanceKey}
        profilePassword={profilePassword}
        userLoading={userLoading}
      />
    </Card>
  );
}
