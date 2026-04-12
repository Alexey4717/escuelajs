import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { DEFAULT_MAX_IMAGE_FILE_SIZE_MB } from '../../../lib/form/schemas/files';
import {
  FILES_BOX_DEFAULT_ACCEPT,
  UPLOAD_MODE_DESCRIPTION_ON_SELECT,
  UPLOAD_MODE_DESCRIPTION_ON_SUBMIT,
} from '../constants';
import type { FilesBoxItem, FilesBoxProps } from '../types';
import {
  formatFilesBoxMaxFilesHint,
  formatFilesBoxOverLimitHint,
  getActiveFiles,
  getFilesBoxRequirementDescription,
  mergeWithLimit,
  normalizeMaxFiles,
  revokeItemPreview,
  setItemStatus,
  validateSelectedFiles,
} from '../utils/files-box-utils';

export function useFilesBox({
  id: idProp,
  value,
  defaultValue = [],
  onChange,
  onValidationErrors,
  maxFiles = 1,
  maxFileSizeMb,
  multiple,
  accept = FILES_BOX_DEFAULT_ACCEPT,
  uploadMode,
}: FilesBoxProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const fieldTitleId = `${inputId}-title`;
  const uploadHintId = `${inputId}-upload-hint`;
  const uploadModeHintId = `${inputId}-upload-mode`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const max = normalizeMaxFiles(maxFiles);
  const resolvedMaxFileSizeMb = maxFileSizeMb ?? DEFAULT_MAX_IMAGE_FILE_SIZE_MB;
  const resolvedMultiple = multiple ?? max > 1;
  const [localValue, setLocalValue] = useState<FilesBoxItem[]>(defaultValue);
  const [localErrors, setLocalErrors] = useState<string[]>([]);
  const items = value ?? localValue;
  const isControlled = value !== undefined;

  const uploadModeDescription =
    uploadMode === 'onSelect'
      ? UPLOAD_MODE_DESCRIPTION_ON_SELECT
      : UPLOAD_MODE_DESCRIPTION_ON_SUBMIT;

  const activeCount = useMemo(() => getActiveFiles(items).length, [items]);
  const overLimit = activeCount > max;
  const atLimit = activeCount >= max && !overLimit;
  const canAddFiles = activeCount < max && !overLimit;

  const updateItems = (next: FilesBoxItem[]) => {
    if (!isControlled) {
      setLocalValue(next);
    }
    onChange?.(next);
  };

  useEffect(() => {
    return () => {
      items.forEach((item) => revokeItemPreview(item));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (fileList: FileList | null) => {
    if (!fileList) return;
    const selectedFiles = Array.from(fileList);
    const { validFiles, errors } = validateSelectedFiles(selectedFiles, {
      maxFiles: max,
      maxFileSizeMb,
    });

    let next = mergeWithLimit(items, validFiles, max);
    if (max > 1) {
      const overflow = getActiveFiles(next).length - max;
      if (overflow > 0) {
        next = next.slice(0, next.length - overflow);
      }
    }

    setLocalErrors(errors);
    onValidationErrors?.(errors);
    updateItems(next);
  };

  const requirementText = getFilesBoxRequirementDescription(
    accept,
    resolvedMaxFileSizeMb,
  );

  const describedBy = useMemo(() => {
    const ids: string[] = [uploadHintId];
    if (uploadMode) ids.push(uploadModeHintId);
    return ids.join(' ');
  }, [uploadHintId, uploadMode, uploadModeHintId]);

  const toggleItemRemoval = (localId: string) => {
    updateItems(setItemStatus(items, localId));
  };

  const limitHintText = overLimit
    ? formatFilesBoxOverLimitHint(maxFiles)
    : formatFilesBoxMaxFilesHint(maxFiles);

  return {
    inputId,
    fieldTitleId,
    uploadHintId,
    uploadModeHintId,
    describedBy,
    fileInputRef,
    max,
    maxFiles,
    resolvedMaxFileSizeMb,
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
  };
}
