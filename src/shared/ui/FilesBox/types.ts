import type { ReactNode } from 'react';

export type FileItemStatus =
  | 'idle'
  | 'queued'
  | 'uploading'
  | 'uploaded'
  | 'marked_for_removal'
  | 'error';

export type FilesBoxItem = {
  localId: string;
  name: string;
  size: number;
  mimeType: string;
  file?: File;
  uploadedUrl?: string;
  previewUrl?: string;
  isObjectUrlPreview?: boolean;
  status: FileItemStatus;
  previousStatus?: Exclude<FileItemStatus, 'marked_for_removal'>;
  error?: string;
};

export interface FilesBoxProps {
  id?: string;
  label: ReactNode;
  description?: ReactNode;
  errorText?: string;
  value?: FilesBoxItem[];
  defaultValue?: FilesBoxItem[];
  onChange?: (value: FilesBoxItem[]) => void;
  onValidationErrors?: (errors: string[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxFileSizeMb?: number;
  multiple?: boolean;
  accept?: string;
  uploadMode?: 'onSelect' | 'onSubmit';
  'data-testid'?: string;
}
