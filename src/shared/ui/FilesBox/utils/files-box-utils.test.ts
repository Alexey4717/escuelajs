import { describe, expect, it } from 'vitest';

import type { FilesBoxItem } from '../types';
import {
  formatFileSize,
  isFilesBoxOverLimit,
  normalizeMaxFiles,
  validateSelectedFiles,
} from './files-box-utils';

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
      'document.pdf: PDF files are not supported',
    ]);
  });

  it('formats file size for display', () => {
    expect(formatFileSize(0)).toBe('—');
    expect(formatFileSize(512)).toMatch(/KB$/);
    expect(formatFileSize(2 * 1024 * 1024)).toBe('2 MB');
  });

  it('detects when active files exceed configured max', () => {
    const active: FilesBoxItem = {
      localId: '1',
      name: 'a.png',
      size: 1,
      mimeType: 'image/png',
      status: 'queued',
    };
    const removed: FilesBoxItem = {
      localId: '2',
      name: 'b.png',
      size: 1,
      mimeType: 'image/png',
      status: 'marked_for_removal',
      previousStatus: 'queued',
    };

    expect(isFilesBoxOverLimit([active], 1)).toBe(false);
    expect(isFilesBoxOverLimit([active, active], 1)).toBe(true);
    expect(isFilesBoxOverLimit([active, removed], 1)).toBe(false);
  });
});
