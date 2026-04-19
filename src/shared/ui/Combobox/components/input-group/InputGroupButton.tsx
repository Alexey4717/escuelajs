'use client';

import { type ComponentProps } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../../../lib/styles/cn';
import { Button } from '../../../Button/Button';
import { inputGroupButtonVariants } from './inputGroupVariants';

export const InputGroupButton = ({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) => (
  <Button
    type={type}
    data-size={size}
    variant={variant}
    className={cn(inputGroupButtonVariants({ size }), className)}
    {...props}
  />
);
