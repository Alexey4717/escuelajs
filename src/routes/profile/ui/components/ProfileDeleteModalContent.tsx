'use client';

import { useState } from 'react';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

type ModalControls = {
  closeModal: () => void;
};

export type ProfileDeleteModalProps = ModalRegistryMap['profileDelete'];

// TODO доделать
export function ProfileDeleteModalContent({ email }: ProfileDeleteModalProps) {
  const [feedback, setFeedback] = useState('');

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

      <label className="block space-y-2">
        <Typography variant="body2" component="span" className="block">
          Причина удаления:
        </Typography>
        <input
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Например: хочу создать новый аккаунт"
        />
      </label>
    </div>
  );
}

export function ProfileDeleteModalFooter({ closeModal }: ModalControls) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={closeModal}
        className="w-full sm:w-auto"
      >
        Отмена
      </Button>
      <Button
        type="button"
        variant="destructive"
        onClick={closeModal}
        className="w-full sm:w-auto"
      >
        Удалить аккаунт
      </Button>
    </div>
  );
}
