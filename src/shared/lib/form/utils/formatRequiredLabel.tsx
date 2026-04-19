import { type ReactNode } from 'react';

export const formatRequiredLabel = (
  label: ReactNode,
  required: boolean,
): ReactNode => {
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
};
