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
