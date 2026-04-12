'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateUserDocument } from '@/shared/api/generated/graphql';
import { uploadFile } from '@/shared/api/rest/files/upload-file';
import {
  evictRootQueryField,
  updateEntityInCache,
} from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';
import type { FilesBoxItem } from '@/shared/ui/FilesBox';

import type { ProfileEditFormStateOutput } from './schema';

interface SubmitArgs {
  userId: string;
  values: ProfileEditFormStateOutput;
  avatarFiles: FilesBoxItem[];
}

export function useSubmitHandler() {
  const router = useRouter();
  const [updateUser, { loading }] = useMutation(UpdateUserDocument);
  const [avatarUploadLoading, setAvatarUploadLoading] = useState(false);

  async function uploadQueuedAvatarFiles(files: FilesBoxItem[]) {
    const next = [...files];
    let hasUploadError = false;

    for (let i = 0; i < next.length; i += 1) {
      const item = next[i];
      if (item.status !== 'queued' || !item.file) continue;

      next[i] = {
        ...item,
        status: 'uploading',
        error: undefined,
      };

      try {
        const uploaded = await uploadFile(item.file);
        next[i] = {
          ...next[i],
          status: 'uploaded',
          uploadedUrl: uploaded.location,
          previewUrl: next[i].previewUrl ?? uploaded.location,
          error: undefined,
        };
      } catch (error) {
        hasUploadError = true;
        const errorMessage =
          error instanceof Error ? error.message : 'Не удалось загрузить файл';
        next[i] = {
          ...next[i],
          status: 'error',
          error: errorMessage,
        };
      }
    }

    return { files: next, hasUploadError };
  }

  function getActualAvatarUrl(files: FilesBoxItem[]): string | undefined {
    const candidates = files.filter(
      (file) =>
        file.status !== 'marked_for_removal' &&
        typeof file.uploadedUrl === 'string' &&
        file.uploadedUrl.length > 0,
    );
    return candidates.at(-1)?.uploadedUrl;
  }

  async function handleSubmit({
    userId,
    values,
    avatarFiles,
  }: SubmitArgs): Promise<FilesBoxItem[]> {
    let filesState = avatarFiles;
    const needsAvatarUpload = avatarFiles.some(
      (item) => item.status === 'queued' && item.file,
    );
    if (needsAvatarUpload) {
      setAvatarUploadLoading(true);
    }
    try {
      const uploadResult = await uploadQueuedAvatarFiles(avatarFiles);
      filesState = uploadResult.files;
      if (uploadResult.hasUploadError) {
        toast.error('Не удалось загрузить один или несколько файлов');
        return filesState;
      }
    } finally {
      if (needsAvatarUpload) {
        setAvatarUploadLoading(false);
      }
    }

    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          changes: {
            email: values.email,
            name: values.name,
            role: values.role,
            avatar: getActualAvatarUrl(filesState),
          },
        },
        update(cache, { data: mutationData }) {
          const updatedUser = mutationData?.updateUser;
          if (!updatedUser) return;

          updateEntityInCache({
            cache,
            typename: 'User',
            id: updatedUser.id,
            fields: {
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              avatar: updatedUser.avatar,
            },
          });

          evictRootQueryField(cache, 'users');
        },
      });

      if (!data?.updateUser) {
        throw new Error('Не удалось получить обновленные данные пользователя');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.users, nextCacheTags.user(userId)],
        paths: [pagesPath.profile.$url().path, pagesPath.users.$url().path],
      });
      toast.success('Профиль успешно обновлен');
      router.replace(pagesPath.profile.$url().path);
      router.refresh();

      return filesState.filter((file) => file.status !== 'marked_for_removal');
    } catch (err) {
      console.error(err);
      toast.error('Не удалось обновить профиль');
      return filesState;
    }
  }

  return {
    loading,
    avatarUploadLoading,
    handleSubmit,
  };
}
