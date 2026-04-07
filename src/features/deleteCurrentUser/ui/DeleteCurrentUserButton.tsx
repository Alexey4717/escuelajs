'use client';

import { Button } from '@/shared/ui/Button/Button';

import { useDeleteCurrentUserModal } from '../model/use-delete-current-user-modal';

type DeleteCurrentUserButtonProps = {
  email: string;
  userId: string;
};

export function DeleteCurrentUserButton({
  email,
  userId,
}: DeleteCurrentUserButtonProps) {
  const { open } = useDeleteCurrentUserModal({
    hydrateProps: { email, userId },
  });

  const handleDeleteCurrentUser = () => {
    open({ email, userId });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      onClick={handleDeleteCurrentUser}
      data-testid="deleteCurrentUser__button__handleDeleteCurrentUser"
    >
      Удалить аккаунт
    </Button>
  );
}
