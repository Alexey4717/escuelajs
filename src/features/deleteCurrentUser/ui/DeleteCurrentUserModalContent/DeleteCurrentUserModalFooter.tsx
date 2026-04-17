import { Button } from '@/shared/ui/Button/Button';

import { DELETE_CURRENT_USER_FORM_ID } from '../../lib/constants';

interface DeleteCurrentUserModalFooterProps {
  closeModal: () => void;
}

export function DeleteCurrentUserModalFooter({
  closeModal,
}: DeleteCurrentUserModalFooterProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={closeModal}
        className="w-full sm:w-auto"
        data-testid="deleteCurrentUser__button__closeModal"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form={DELETE_CURRENT_USER_FORM_ID}
        variant="destructive"
        className="w-full sm:w-auto"
        data-testid="deleteCurrentUser__button__submitDelete"
      >
        Delete account
      </Button>
    </div>
  );
}
