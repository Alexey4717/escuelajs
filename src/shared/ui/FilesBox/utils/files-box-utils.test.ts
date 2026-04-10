import { describe, expect, it } from 'vitest';

import { normalizeMaxFiles, validateSelectedFiles } from './files-box-utils';

describe('files-box-utils', () => {
  it('normalizes max files to not exceed 3', () => {
    expect(normalizeMaxFiles(undefined)).toBe(1);
    expect(normalizeMaxFiles(1)).toBe(1);
    expect(normalizeMaxFiles(3)).toBe(3);
    expect(normalizeMaxFiles(8)).toBe(3);
  });

  it('filters out invalid files', () => {
    const png = new File(['ok'], 'avatar.png', { type: 'image/png' });
    const pdf = new File(['bad'], 'document.pdf', { type: 'application/pdf' });

    const result = validateSelectedFiles([png, pdf], {
      maxFiles: 3,
      maxFileSizeMb: 5,
    });

    expect(result.validFiles).toHaveLength(1);
    expect(result.errors).toEqual([
      'document.pdf: PDF-файлы не поддерживаются',
    ]);
  });
});
