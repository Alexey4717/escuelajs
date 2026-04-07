'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { Form } from '@/shared/ui/Form/Form';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useDeleteCurrentUserSubmitHandler } from '../../api/use-delete-current-user-submit-handler';
import { DELETE_CURRENT_USER_FORM_ID } from '../../lib/constants';
import { DeleteCurrentUserReasonField } from '../../lib/form/fields';
import {
  deleteCurrentUserFormDefaultValues,
  deleteCurrentUserFormSchema,
  DeleteCurrentUserFormStateInput,
  DeleteCurrentUserFormStateOutput,
} from '../../lib/form/scheme';

type DeleteCurrentUserModalContentProps = ModalRegistryMap['profileDelete'] & {
  closeModal: () => void;
};

export function DeleteCurrentUserModalContent({
  email,
  userId,
  closeModal,
}: DeleteCurrentUserModalContentProps) {
  const methods = useForm<
    DeleteCurrentUserFormStateInput,
    unknown,
    DeleteCurrentUserFormStateOutput
  >({
    resolver: standardSchemaResolver(deleteCurrentUserFormSchema),
    defaultValues: deleteCurrentUserFormDefaultValues,
  });
  const { submitDelete } = useDeleteCurrentUserSubmitHandler();

  async function handleSubmit() {
    await submitDelete({ userId, closeModal });
  }

  return (
    <div className="space-y-4">
      <Typography
        variant="body2"
        component="p"
        className="text-muted-foreground"
      >
        Вы действительно хотите удалить аккаунт <strong>{email}</strong>? Это
        действие необратимо.
      </Typography>

      <Form
        id={DELETE_CURRENT_USER_FORM_ID}
        methods={methods}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <DeleteCurrentUserReasonField placeholder="Например: хочу создать новый аккаунт" />
      </Form>
    </div>
  );
}
