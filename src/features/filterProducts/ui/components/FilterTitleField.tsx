import { NetworkStatus } from '@apollo/client';

import { TextField } from '@/shared/ui/TextField/TextField';

import { useFilterTitleField } from '../../lib/hooks/use-filter-title-field';

interface FilterTitleFieldProps {
  productsNetworkStatus: NetworkStatus;
  resetKey: number;
}

export function FilterTitleField({
  productsNetworkStatus,
  resetKey,
}: FilterTitleFieldProps) {
  const { titleInput, onTitleChange, titleLoading } = useFilterTitleField({
    productsNetworkStatus,
    resetKey,
  });

  return (
    <div className="min-w-0 [&_[data-slot=field-label]]:!mb-0">
      <TextField
        label="Title"
        placeholder="Search by title…"
        value={titleInput}
        onChange={onTitleChange}
        loading={titleLoading}
        autoComplete="off"
      />
    </div>
  );
}
