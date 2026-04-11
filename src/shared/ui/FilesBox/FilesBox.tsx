'use client';

import { useEffect, useId, useMemo, useState } from 'react';

import { cn } from '../../lib/styles/cn';
import { AppImage } from '../AppImage/AppImage';
import { Button } from '../Button/Button';
import { textFieldInputClassName } from '../TextField/classNames';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../TextField/components/Field';
import { Input } from '../TextField/components/Input';
import type { FilesBoxItem } from './types';
import {
  getActiveFiles,
  mergeWithLimit,
  normalizeMaxFiles,
  revokeItemPreview,
  setItemStatus,
  validateSelectedFiles,
} from './utils/files-box-utils';

export interface FilesBoxProps {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
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

export function FilesBox({
  id: idProp,
  label,
  description,
  errorText,
  value,
  defaultValue = [],
  onChange,
  onValidationErrors,
  disabled,
  maxFiles = 1,
  maxFileSizeMb,
  multiple,
  accept = 'image/*',
  uploadMode,
  'data-testid': dataTestId,
}: FilesBoxProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const max = normalizeMaxFiles(maxFiles);
  const resolvedMultiple = multiple ?? max > 1;
  const [localValue, setLocalValue] = useState<FilesBoxItem[]>(defaultValue);
  const [localErrors, setLocalErrors] = useState<string[]>([]);
  const items = value ?? localValue;
  const isControlled = value !== undefined;
  const uploadModeDescription =
    uploadMode === 'onSelect'
      ? 'Файлы загружаются сразу после выбора'
      : 'Файлы будут загружены при сохранении формы';

  const activeCount = useMemo(() => getActiveFiles(items).length, [items]);

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

  return (
    <Field
      data-invalid={Boolean(errorText) || localErrors.length > 0 || undefined}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={inputId}
          data-testid={dataTestId}
          type="file"
          className={cn(textFieldInputClassName)}
          disabled={disabled}
          accept={accept}
          multiple={resolvedMultiple}
          onChange={(e) => {
            handleFileSelect(e.target.files);
            e.target.value = '';
          }}
        />
        <FieldDescription>
          {description ??
            `Выбрано ${activeCount}/${max} файла(ов). ${uploadModeDescription}`}
        </FieldDescription>
        {items.length > 0 ? (
          <div className="flex flex-col gap-2 rounded-md border border-border p-2">
            {items.map((item) => (
              <div
                key={item.localId}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-md border border-border px-2 py-1.5 text-sm',
                  item.status === 'marked_for_removal' && 'opacity-50',
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {item.previewUrl ? (
                    <AppImage
                      src={item.previewUrl}
                      alt={item.name}
                      className="h-8 w-8 rounded object-cover"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.status}
                      {item.error ? `: ${item.error}` : ''}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={disabled}
                  onClick={() =>
                    updateItems(setItemStatus(items, item.localId))
                  }
                >
                  {item.status === 'marked_for_removal'
                    ? 'Отменить удаление'
                    : 'Удалить'}
                </Button>
              </div>
            ))}
          </div>
        ) : null}
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
