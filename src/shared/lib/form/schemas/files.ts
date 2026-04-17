import { array, custom } from 'zod/v4';

export const IMAGE_FILE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.avif',
] as const;

export const IMAGE_MIME_PREFIX = 'image/';
export const DEFAULT_MAX_IMAGE_FILE_SIZE_MB = 5;
export const DEFAULT_MAX_IMAGE_FILES = 3;

export type ImageFileValidationOptions = {
  maxFileSizeMb?: number;
  allowedExtensions?: readonly string[];
};

function hasAllowedImageExtension(
  fileName: string,
  allowedExtensions: readonly string[],
) {
  const lower = fileName.toLowerCase();
  return allowedExtensions.some((ext) => lower.endsWith(ext));
}

export function validateImageFile(
  file: File,
  options: ImageFileValidationOptions = {},
): string | undefined {
  const maxFileSizeMb = options.maxFileSizeMb ?? DEFAULT_MAX_IMAGE_FILE_SIZE_MB;
  const allowedExtensions = options.allowedExtensions ?? IMAGE_FILE_EXTENSIONS;
  const maxBytes = maxFileSizeMb * 1024 * 1024;

  if (file.type === 'application/pdf') {
    return 'PDF files are not supported';
  }

  const hasImageMime =
    typeof file.type === 'string' && file.type.startsWith(IMAGE_MIME_PREFIX);
  const hasImageExt = hasAllowedImageExtension(file.name, allowedExtensions);

  if (!hasImageMime && !hasImageExt) {
    return 'Only image files are allowed';
  }

  if (file.size > maxBytes) {
    return `Maximum file size: ${maxFileSizeMb}MB`;
  }

  return undefined;
}

export function createImageFilesSchema(
  options: {
    maxFiles?: number;
    maxFileSizeMb?: number;
    allowedExtensions?: readonly string[];
  } = {},
) {
  const maxFiles = Math.min(options.maxFiles ?? 1, DEFAULT_MAX_IMAGE_FILES);

  return array(custom<File>((value) => value instanceof File, 'Invalid file'))
    .max(maxFiles, `You can select up to ${maxFiles} files`)
    .superRefine((files, ctx) => {
      files.forEach((file, index) => {
        const err = validateImageFile(file, options);
        if (!err) return;
        ctx.addIssue({
          code: 'custom',
          path: [index],
          message: err,
        });
      });
    });
}
