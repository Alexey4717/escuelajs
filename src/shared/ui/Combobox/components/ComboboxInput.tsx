'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxInputProps } from '../types';
import { ComboboxClear } from './ComboboxClear';
import { ComboboxTrigger } from './ComboboxTrigger';
import { InputGroup } from './input-group/InputGroup';
import { InputGroupAddon } from './input-group/InputGroupAddon';
import { InputGroupButton } from './input-group/InputGroupButton';
import { InputGroupInput } from './input-group/InputGroupInput';

export const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) => (
  <InputGroup className={cn('w-auto', className)}>
    <ComboboxPrimitive.Input
      render={<InputGroupInput disabled={disabled} />}
      {...props}
    />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <InputGroupButton
          size="icon-xs"
          variant="ghost"
          asChild
          data-slot="input-group-button"
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
          disabled={disabled}
        >
          <ComboboxTrigger />
        </InputGroupButton>
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
    {children}
  </InputGroup>
);
