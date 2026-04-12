import type { ReactNode, RefObject } from 'react';

import { UploadIcon } from 'lucide-react';

import { Button } from '../../Button/Button';
import { FieldDescription } from '../../TextField/components/Field';

interface FilesBoxAttachSectionProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  inputId: string;
  fieldTitleId: string;
  describedBy: string;
  dataTestId?: string;
  disabled?: boolean;
  accept: string;
  resolvedMultiple: boolean;
  uploadHintId: string;
  uploadModeHintId: string;
  description?: ReactNode;
  requirementText: string;
  uploadMode?: 'onSelect' | 'onSubmit';
  uploadModeDescription: string;
  onFileSelect: (fileList: FileList | null) => void;
}

export function FilesBoxAttachSection({
  fileInputRef,
  inputId,
  fieldTitleId,
  describedBy,
  dataTestId,
  disabled,
  accept,
  resolvedMultiple,
  uploadHintId,
  uploadModeHintId,
  description,
  requirementText,
  uploadMode,
  uploadModeDescription,
  onFileSelect,
}: FilesBoxAttachSectionProps) {
  return (
    <div className="flex flex-wrap items-start gap-3">
      <input
        ref={fileInputRef}
        id={inputId}
        data-testid={dataTestId}
        type="file"
        className="sr-only"
        disabled={disabled}
        accept={accept}
        multiple={resolvedMultiple}
        aria-labelledby={fieldTitleId}
        aria-describedby={describedBy}
        onChange={(e) => {
          onFileSelect(e.target.files);
          e.target.value = '';
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="default"
        disabled={disabled}
        className="uppercase tracking-wide"
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon />
        Прикрепить файл
      </Button>
      <FieldDescription
        id={uploadHintId}
        className="min-w-[12rem] flex-1 self-center"
      >
        {description ?? requirementText}
      </FieldDescription>
      {uploadMode ? (
        <FieldDescription
          id={uploadModeHintId}
          className="w-full basis-full text-xs"
        >
          {uploadModeDescription}
        </FieldDescription>
      ) : null}
    </div>
  );
}
