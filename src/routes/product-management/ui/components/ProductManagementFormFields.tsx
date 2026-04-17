import type { FilesBoxItem } from '@/shared/ui/FilesBox';
import { FilesBox } from '@/shared/ui/FilesBox';

import { PRODUCT_IMAGES_MAX_FILES } from '../../lib/constants';
import {
  ProductDescriptionField,
  ProductPriceField,
  ProductTitleField,
} from '../../lib/form/fields';
import { ProductManagementCategoryField } from './ProductManagementCategoryField';

interface ProductManagementFormFieldsProps {
  imageFiles: FilesBoxItem[];
  onImageFilesChange: (files: FilesBoxItem[]) => void;
}

export function ProductManagementFormFields({
  imageFiles,
  onImageFilesChange,
}: ProductManagementFormFieldsProps) {
  return (
    <>
      <ProductTitleField placeholder="For example, Awesome Shirt" />
      <ProductPriceField type="number" min={1} step="0.01" placeholder="1999" />
      <ProductDescriptionField
        rows={4}
        placeholder="Short product description"
      />
      <ProductManagementCategoryField />
      <FilesBox
        label="Product images"
        maxFiles={PRODUCT_IMAGES_MAX_FILES}
        accept="image/*"
        maxFileSizeMb={5}
        uploadMode="onSubmit"
        value={imageFiles}
        onChange={onImageFilesChange}
        data-testid="productForm__input__image"
      />
    </>
  );
}
