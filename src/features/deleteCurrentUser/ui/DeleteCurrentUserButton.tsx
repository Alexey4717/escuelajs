'use client';

import { Button } from '@/shared/ui/Button/Button';

import { useDeleteCurrentUserModal } from '../model/use-delete-current-user-modal';

interface DeleteCurrentUserButtonProps {
  email: string;
  userId: string;
}
export const DeleteCurrentUserButton = ({
  email,
  userId,
}: DeleteCurrentUserButtonProps) => {
  const { open } = useDeleteCurrentUserModal();

  const handleDeleteCurrentUser = () => {
    open({ email, userId });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      aria-haspopup="dialog"
      onClick={handleDeleteCurrentUser}
      data-testid="deleteCurrentUser__button__handleDeleteCurrentUser"
    >
      Delete account
    </Button>
  );
};
