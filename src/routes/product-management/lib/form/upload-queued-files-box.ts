import { uploadFile } from '@/shared/api/rest/files/upload-file';
import type { FilesBoxItem } from '@/shared/ui/FilesBox';
import { getActiveFiles } from '@/shared/ui/FilesBox';

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

export function collectProductImageUrls(files: FilesBoxItem[]): string[] {
  return getActiveFiles(files)
    .map((item) => item.uploadedUrl)
    .filter((url): url is string => typeof url === 'string' && url.length > 0);
}
