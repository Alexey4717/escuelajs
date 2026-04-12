'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldTitle,
} from '../TextField/components/Field';
import { FilesBoxAttachSection } from './components/FilesBoxAttachSection';
import { FilesBoxItemRow } from './components/FilesBoxItemRow';
import { FilesBoxLimitHint } from './components/FilesBoxLimitHint';
import { useFilesBox } from './hooks/useFilesBox';
import type { FilesBoxProps } from './types';

export function FilesBox(props: FilesBoxProps) {
  const {
    label,
    description,
    errorText,
    disabled,
    'data-testid': dataTestId,
  } = props;

  const {
    inputId,
    fieldTitleId,
    uploadHintId,
    uploadModeHintId,
    describedBy,
    fileInputRef,
    resolvedMultiple,
    items,
    localErrors,
    uploadMode,
    uploadModeDescription,
    requirementText,
    overLimit,
    atLimit,
    canAddFiles,
    handleFileSelect,
    toggleItemRemoval,
    limitHintText,
    accept,
  } = useFilesBox(props);

  return (
    <Field
      data-invalid={
        Boolean(errorText) || localErrors.length > 0 || overLimit || undefined
      }
    >
      <FieldTitle id={fieldTitleId}>{label}</FieldTitle>
      <FieldContent className="gap-3">
        {items.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <FilesBoxItemRow
                key={item.localId}
                item={item}
                disabled={disabled}
                onToggleRemoval={toggleItemRemoval}
              />
            ))}
          </ul>
        ) : null}

        {canAddFiles ? (
          <FilesBoxAttachSection
            fileInputRef={fileInputRef}
            inputId={inputId}
            fieldTitleId={fieldTitleId}
            describedBy={describedBy}
            dataTestId={dataTestId}
            disabled={disabled}
            accept={accept}
            resolvedMultiple={resolvedMultiple}
            uploadHintId={uploadHintId}
            uploadModeHintId={uploadModeHintId}
            description={description}
            requirementText={requirementText}
            uploadMode={uploadMode}
            uploadModeDescription={uploadModeDescription}
            onFileSelect={handleFileSelect}
          />
        ) : null}

        {!canAddFiles && description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}

        <FilesBoxLimitHint
          overLimit={overLimit}
          atLimit={atLimit}
          text={limitHintText}
        />

        <FieldError>{errorText}</FieldError>
        <FieldError
          errors={localErrors.map((message) => ({
            message,
          }))}
        />
      </FieldContent>
    </Field>
  );
}
