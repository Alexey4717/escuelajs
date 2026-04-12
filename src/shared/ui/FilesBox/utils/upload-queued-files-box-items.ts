import { uploadFile } from '../../../api/rest/files/upload-file';
import type { FilesBoxItem } from '../types';
import { getActiveFiles } from './files-box-utils';

export async function uploadQueuedFilesBoxItems(files: FilesBoxItem[]) {
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

export function collectUploadedFileUrls(files: FilesBoxItem[]): string[] {
  return getActiveFiles(files)
    .map((item) => item.uploadedUrl)
    .filter((url): url is string => typeof url === 'string' && url.length > 0);
}

/** Первый загруженный URL (например, для API с одним полем `image`). */
export function firstUploadedFileUrl(
  files: FilesBoxItem[],
): string | undefined {
  return collectUploadedFileUrls(files)[0];
}

export async function uploadQueuedFilesBoxItemsWithLoading(
  files: FilesBoxItem[],
  setUploadLoading: (loading: boolean) => void,
): Promise<{ files: FilesBoxItem[]; hasUploadError: boolean }> {
  const needsImageUpload = files.some(
    (item) => item.status === 'queued' && item.file,
  );
  if (needsImageUpload) {
    setUploadLoading(true);
  }
  try {
    return await uploadQueuedFilesBoxItems(files);
  } finally {
    if (needsImageUpload) {
      setUploadLoading(false);
    }
  }
}
