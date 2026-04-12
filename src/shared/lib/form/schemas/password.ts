import { string } from 'zod/v4';

const asciiPrintablePasswordRegex = /^[\x20-\x7E]+$/;

export const passwordSchema = string()
  .min(6, 'Минимум 6 символов')
  .regex(asciiPrintablePasswordRegex, 'Допускается латиница, цифры и символы');
