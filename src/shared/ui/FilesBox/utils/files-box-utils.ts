import {
  DEFAULT_MAX_IMAGE_FILE_SIZE_MB,
  DEFAULT_MAX_IMAGE_FILES,
  validateImageFile,
} from '../../../lib/form/schemas/files';
import type { FilesBoxItem } from '../types';

export function normalizeMaxFiles(maxFiles: number | undefined): number {
  if (!maxFiles || maxFiles < 1) return 1;
  return Math.min(maxFiles, DEFAULT_MAX_IMAGE_FILES);
}

export function createQueuedItem(file: File): FilesBoxItem {
  const previewUrl = URL.createObjectURL(file);

  return {
    localId: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    mimeType: file.type,
    file,
    previewUrl,
    isObjectUrlPreview: true,
    status: 'queued',
  };
}

export function getActiveFiles(items: FilesBoxItem[]) {
  return items.filter((item) => item.status !== 'marked_for_removal');
}

export function validateSelectedFiles(
  files: File[],
  opts: {
    maxFileSizeMb?: number;
    maxFiles?: number;
  },
): { validFiles: File[]; errors: string[] } {
  const maxFiles = normalizeMaxFiles(opts.maxFiles);
  const maxFileSizeMb = opts.maxFileSizeMb ?? DEFAULT_MAX_IMAGE_FILE_SIZE_MB;
  const validFiles: File[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const err = validateImageFile(file, { maxFileSizeMb });
    if (err) {
      errors.push(`${file.name}: ${err}`);
      continue;
    }
    validFiles.push(file);
  }

  if (validFiles.length > maxFiles) {
    errors.push(`Можно выбрать не более ${maxFiles} файлов`);
  }

  return {
    validFiles: validFiles.slice(0, maxFiles),
    errors,
  };
}

export function revokeItemPreview(item: FilesBoxItem) {
  if (item.isObjectUrlPreview && item.previewUrl) {
    URL.revokeObjectURL(item.previewUrl);
  }
}

export function createRemoteFileItem(url: string): FilesBoxItem {
  return {
    localId: crypto.randomUUID(),
    name: 'uploaded-file',
    size: 0,
    mimeType: 'image/*',
    uploadedUrl: url,
    previewUrl: url,
    status: 'idle',
  };
}

export function setItemStatus(
  items: FilesBoxItem[],
  localId: string,
): FilesBoxItem[] {
  return items.map((item) => {
    if (item.localId !== localId) return item;
    if (item.status === 'marked_for_removal') {
      return {
        ...item,
        status: item.previousStatus ?? 'idle',
        previousStatus: undefined,
      };
    }
    return {
      ...item,
      status: 'marked_for_removal',
      previousStatus: item.status,
    };
  });
}

export function mergeWithLimit(
  prev: FilesBoxItem[],
  nextFiles: File[],
  maxFiles: number,
): FilesBoxItem[] {
  const queuedItems = nextFiles.map((file) => createQueuedItem(file));
  if (maxFiles === 1) {
    return [
      ...prev.map((item) => ({
        ...item,
        status: 'marked_for_removal' as const,
      })),
      ...queuedItems.slice(0, 1),
    ];
  }
  const active = getActiveFiles(prev);
  const slotsLeft = Math.max(maxFiles - active.length, 0);
  return [...prev, ...queuedItems.slice(0, slotsLeft)];
}
