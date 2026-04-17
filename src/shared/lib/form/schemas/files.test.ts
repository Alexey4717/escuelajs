import { describe, expect, it } from 'vitest';

import {
  createImageFilesSchema,
  DEFAULT_MAX_IMAGE_FILES,
  validateImageFile,
} from './files';

describe('files schema', () => {
  it('rejects pdf file', () => {
    const pdf = new File(['pdf'], 'doc.pdf', { type: 'application/pdf' });
    expect(validateImageFile(pdf)).toBe('PDF files are not supported');
  });

  it('rejects oversized image file', () => {
    const bigFile = new File([new Uint8Array(6 * 1024 * 1024)], 'big.png', {
      type: 'image/png',
    });

    expect(validateImageFile(bigFile, { maxFileSizeMb: 5 })).toBe(
      'Maximum file size: 5MB',
    );
  });

  it('limits number of files with schema', () => {
    const schema = createImageFilesSchema({ maxFiles: 10 });
    const files = Array.from({ length: DEFAULT_MAX_IMAGE_FILES + 1 }).map(
      (_, idx) =>
        new File([`img-${idx}`], `img-${idx}.png`, {
          type: 'image/png',
        }),
    );

    const result = schema.safeParse(files);
    expect(result.success).toBe(false);
  });
});
