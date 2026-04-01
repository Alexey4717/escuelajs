import type { ZodObject } from 'zod/v4';

import { isZodObjectFieldRequired } from './isZodObjectFieldRequired';

/**
 * Обязательность поля верхнего уровня объекта Zod для маркировки в UI (см. {@link isZodObjectFieldRequired}).
 */
export function requiredFromSchemaShape<TSchema extends ZodObject>(
  schema: TSchema,
  name: keyof TSchema['shape'] & string,
): boolean {
  return isZodObjectFieldRequired(schema, name);
}
