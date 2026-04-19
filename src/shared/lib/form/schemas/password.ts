import { string } from 'zod/v4';

const asciiPrintablePasswordRegex = /^[\x20-\x7E]+$/;

export const passwordSchema = string()
  .min(6, 'Minimum 6 characters')
  .regex(
    asciiPrintablePasswordRegex,
    'Only Latin letters, digits, and symbols are allowed',
  );
