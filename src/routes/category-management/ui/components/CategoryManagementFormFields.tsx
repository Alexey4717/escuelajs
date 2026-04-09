import { CategoryImageField, CategoryNameField } from '../../lib/form/fields';

export const CategoryManagementFormFields = () => (
  <>
    <CategoryNameField placeholder="Например, Clothes" />
    <CategoryImageField
      type="url"
      autoComplete="url"
      placeholder="https://api.lorem.space/image/fashion?w=640&h=480&r=42"
    />
  </>
);
