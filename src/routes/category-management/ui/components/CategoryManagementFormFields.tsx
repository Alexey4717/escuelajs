import type { FilesBoxItem } from '@/shared/ui/FilesBox';
import { FilesBox } from '@/shared/ui/FilesBox';

import { CATEGORY_IMAGE_FILES_MAX } from '../../lib/constants';
import { CategoryNameField } from '../../lib/form/fields';

interface CategoryManagementFormFieldsProps {
  imageFiles: FilesBoxItem[];
  onImageFilesChange: (files: FilesBoxItem[]) => void;
}

export function CategoryManagementFormFields({
  imageFiles,
  onImageFilesChange,
}: CategoryManagementFormFieldsProps) {
  return (
    <>
      <CategoryNameField placeholder="Например, Clothes" />
      <FilesBox
        label="Изображение категории"
        maxFiles={CATEGORY_IMAGE_FILES_MAX}
        accept="image/*"
        maxFileSizeMb={5}
        uploadMode="onSubmit"
        value={imageFiles}
        onChange={onImageFilesChange}
        data-testid="categoryForm__input__image"
      />
    </>
  );
}
