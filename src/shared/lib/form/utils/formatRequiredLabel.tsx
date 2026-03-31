import { type ReactNode } from 'react';

export function formatRequiredLabel(
  label: ReactNode,
  required: boolean,
): ReactNode {
  if (!required) {
    return label;
  }

  if (typeof label === 'string') {
    return `${label} *`;
  }

  return (
    <>
      {label}
      {' *'}
    </>
  );
}
