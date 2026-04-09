import {
  ProductCategoryIdField,
  ProductDescriptionField,
  ProductImageField,
  ProductPriceField,
  ProductTitleField,
} from '../../lib/form/fields';

export const ProductManagementFormFields = () => (
  <>
    <ProductTitleField placeholder="Например, Awesome Shirt" />
    <ProductPriceField type="number" min={1} step="0.01" placeholder="1999" />
    <ProductDescriptionField rows={4} placeholder="Краткое описание товара" />
    <ProductCategoryIdField type="number" min={1} step="1" placeholder="1" />
    <ProductImageField
      type="url"
      autoComplete="url"
      placeholder="https://api.lorem.space/image/fashion?w=640&h=480&r=42"
    />
  </>
);
