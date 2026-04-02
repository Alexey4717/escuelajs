import { string } from 'zod/v4';

export const passwordSchema = string().min(6, 'Минимум 6 символов');
