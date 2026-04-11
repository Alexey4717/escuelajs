import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export type ComboboxOption<TValue extends string = string> = {
  value: TValue;
  label: ReactNode;
  disabled?: boolean;
};

export type ComboboxRootProps = ComponentProps<typeof ComboboxPrimitive.Root>;

export type ComboboxValueProps = ComponentProps<typeof ComboboxPrimitive.Value>;

export type ComboboxTriggerProps = ComponentProps<
  typeof ComboboxPrimitive.Trigger
>;

export type ComboboxClearProps = ComponentProps<typeof ComboboxPrimitive.Clear>;

export type ComboboxInputProps = ComponentProps<
  typeof ComboboxPrimitive.Input
> & {
  showTrigger?: boolean;
  showClear?: boolean;
};

export type ComboboxContentProps = ComponentProps<
  typeof ComboboxPrimitive.Popup
> &
  Pick<
    ComponentProps<typeof ComboboxPrimitive.Positioner>,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >;

export type ComboboxListProps = ComponentProps<typeof ComboboxPrimitive.List>;

export type ComboboxItemProps = ComponentProps<typeof ComboboxPrimitive.Item>;

export type ComboboxGroupProps = ComponentProps<typeof ComboboxPrimitive.Group>;

export type ComboboxGroupLabelProps = ComponentProps<
  typeof ComboboxPrimitive.GroupLabel
>;

export type ComboboxCollectionProps = ComponentProps<
  typeof ComboboxPrimitive.Collection
>;

export type ComboboxEmptyProps = ComponentProps<typeof ComboboxPrimitive.Empty>;

export type ComboboxSeparatorProps = ComponentProps<
  typeof ComboboxPrimitive.Separator
>;

export type ComboboxChipsProps = ComponentPropsWithRef<
  typeof ComboboxPrimitive.Chips
> &
  ComboboxPrimitive.Chips.Props;

export type ComboboxChipProps = ComponentProps<
  typeof ComboboxPrimitive.Chip
> & {
  showRemove?: boolean;
};

export type ComboboxChipsInputProps = ComponentProps<
  typeof ComboboxPrimitive.Input
>;
