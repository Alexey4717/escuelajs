import type { ZodObject } from 'zod/v4';

import { isZodObjectFieldRequired } from './isZodObjectFieldRequired';

/**
 * Обязательность поля верхнего уровня объекта Zod для маркировки в UI (см. {@link isZodObjectFieldRequired}).
 */
export const requiredFromSchemaShape = <TSchema extends ZodObject>(
  schema: TSchema,
  name: keyof TSchema['shape'] & string,
): boolean => isZodObjectFieldRequired(schema, name);
