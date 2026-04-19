import {
  DEFAULT_MAX_IMAGE_FILE_SIZE_MB,
  DEFAULT_MAX_IMAGE_FILES,
  validateImageFile,
} from '../../../lib/form/schemas/files';
import type { FilesBoxItem } from '../types';

export const normalizeMaxFiles = (maxFiles: number | undefined): number => {
  if (!maxFiles || maxFiles < 1) return 1;
  return Math.min(maxFiles, DEFAULT_MAX_IMAGE_FILES);
};

export const createQueuedItem = (file: File): FilesBoxItem => {
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
};

export const getActiveFiles = (items: FilesBoxItem[]) =>
  items.filter((item) => item.status !== 'marked_for_removal');

/** Человекочитаемый размер для UI карточки файла (`0` — без известного размера, например удалённый blob). */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '—';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    const rounded = mb >= 10 ? Math.round(mb) : Math.round(mb * 10) / 10;
    return `${rounded} MB`;
  }
  const kb = bytes / 1024;
  const roundedKb = kb >= 10 ? Math.round(kb) : Math.round(kb * 10) / 10;
  return `${roundedKb} KB`;
};

export const isFilesBoxOverLimit = (
  items: FilesBoxItem[],
  maxFiles?: number,
): boolean => getActiveFiles(items).length > normalizeMaxFiles(maxFiles);

export const formatFilesBoxMaxFilesHint = (maxFiles: number): string => {
  const max = normalizeMaxFiles(maxFiles);
  if (max === 1) return 'Maximum 1 file';
  return `Maximum ${max} files`;
};

export const formatFilesBoxOverLimitHint = (maxFiles: number): string => {
  const max = normalizeMaxFiles(maxFiles);
  return `File limit exceeded (${max}). Remove extra files.`;
};

export const getFilesBoxRequirementDescription = (
  accept: string,
  maxFileSizeMb: number,
): string => {
  const typePart =
    accept.trim() === 'image/*' || accept.startsWith('image/')
      ? 'Allowed image formats (JPEG, PNG, WebP, etc.)'
      : `Allowed types: ${accept}`;
  return `${typePart}. Maximum size per file: ${maxFileSizeMb} MB.`;
};

export const validateSelectedFiles = (
  files: File[],
  opts: {
    maxFileSizeMb?: number;
    maxFiles?: number;
  },
): {
  validFiles: File[];
  errors: string[];
} => {
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
    errors.push(`You can select up to ${maxFiles} files`);
  }

  return {
    validFiles: validFiles.slice(0, maxFiles),
    errors,
  };
};

export const revokeItemPreview = (item: FilesBoxItem) => {
  if (item.isObjectUrlPreview && item.previewUrl) {
    URL.revokeObjectURL(item.previewUrl);
  }
};

export const createRemoteFileItem = (url: string): FilesBoxItem => ({
  localId: crypto.randomUUID(),
  name: 'uploaded-file',
  size: 0,
  mimeType: 'image/*',
  uploadedUrl: url,
  previewUrl: url,
  status: 'idle',
});

export const setItemStatus = (
  items: FilesBoxItem[],
  localId: string,
): FilesBoxItem[] =>
  items.map((item) => {
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

export const mergeWithLimit = (
  prev: FilesBoxItem[],
  nextFiles: File[],
  maxFiles: number,
): FilesBoxItem[] => {
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
};
