'use client';

import { useState } from 'react';

import Link from 'next/link';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import type { UserDetailsQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import type { FilesBoxItem } from '@/shared/ui/FilesBox';
import { createRemoteFileItem, FilesBox } from '@/shared/ui/FilesBox';
import { Form } from '@/shared/ui/Form/Form';

import { parseUserRole } from '@/entities/User';

import {
  ProfileEditEmailField,
  ProfileEditNameField,
} from '../../lib/form/fields';
import {
  profileEditFormSchema,
  type ProfileEditFormStateInput,
  type ProfileEditFormStateOutput,
} from '../../lib/form/schema';
import { useSubmitHandler } from '../../lib/form/useSubmitHandler';
import { ProfileEditRoleSection } from './ProfileEditRoleSection';

interface ProfileEditFormCardProps {
  user: UserDetailsQuery['user'];
}

export function ProfileEditFormCard({ user }: ProfileEditFormCardProps) {
  const { handleSubmit: submitProfileEdit, loading: submitLoading } =
    useSubmitHandler();
  const [avatarFiles, setAvatarFiles] = useState<FilesBoxItem[]>(
    user.avatar ? [createRemoteFileItem(user.avatar)] : [],
  );

  const methods = useForm<
    ProfileEditFormStateInput,
    unknown,
    ProfileEditFormStateOutput
  >({
    resolver: standardSchemaResolver(profileEditFormSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      role: parseUserRole(user.role) as ProfileEditFormStateOutput['role'],
    },
  });

  const onSubmit = async (values: ProfileEditFormStateOutput) => {
    const nextFiles = await submitProfileEdit({
      userId: user.id,
      values,
      avatarFiles,
    });
    setAvatarFiles(nextFiles);
  };

  return (
    <Card title="Данные профиля" className="max-w-2xl shadow-sm ring-border/60">
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <ProfileEditEmailField
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <ProfileEditNameField autoComplete="name" placeholder="Ваше имя" />
        <ProfileEditRoleSection />
        <FilesBox
          label="Аватар"
          maxFiles={1}
          accept="image/*"
          maxFileSizeMb={5}
          uploadMode="onSubmit"
          value={avatarFiles}
          onChange={setAvatarFiles}
          data-testid="profileEdit__input__avatar"
        />
        <div className="flex align-center justify-between gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href={pagesPath.profile.$url().path}>Назад в профиль</Link>
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={submitLoading}
            data-testid="profileEdit__button__submit"
          >
            Сохранить изменения
          </Button>
        </div>
      </Form>
    </Card>
  );
}
