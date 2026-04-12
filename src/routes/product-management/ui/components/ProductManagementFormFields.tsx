import {
  ProductDescriptionField,
  ProductImageField,
  ProductPriceField,
  ProductTitleField,
} from '../../lib/form/fields';
import { ProductManagementCategoryField } from './ProductManagementCategoryField';

export const ProductManagementFormFields = () => (
  <>
    <ProductTitleField placeholder="Например, Awesome Shirt" />
    <ProductPriceField type="number" min={1} step="0.01" placeholder="1999" />
    <ProductDescriptionField rows={4} placeholder="Краткое описание товара" />
    <ProductManagementCategoryField />
    <ProductImageField
      type="url"
      autoComplete="url"
      placeholder="https://api.lorem.space/image/fashion?w=640&h=480&r=42"
    />
  </>
);
