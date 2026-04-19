import type { FilesBoxItem } from '@/shared/ui/FilesBox';
import { FilesBox } from '@/shared/ui/FilesBox';

import { CATEGORY_IMAGE_FILES_MAX } from '../../lib/constants';
import { CategoryNameField } from '../../lib/form/fields';

interface CategoryManagementFormFieldsProps {
  imageFiles: FilesBoxItem[];
  onImageFilesChange: (files: FilesBoxItem[]) => void;
}

export const CategoryManagementFormFields = ({
  imageFiles,
  onImageFilesChange,
}: CategoryManagementFormFieldsProps) => (
  <>
    <CategoryNameField placeholder="For example, Clothes" />
    <FilesBox
      label="Category image"
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
