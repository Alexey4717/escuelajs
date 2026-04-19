import type { ZodObject } from 'zod/v4';

/**
 * Соответствует ли поле объекта Zod **обязательным** при вводе: значение не допускает
 * `undefined` (как у {@link ZodType.isOptional} — по сути `!safeParse(undefined).success`).
 *
 * **Важно:** `z.string()` — обязательное поле (пустая строка `""` допустима, `undefined` — нет).
 * Чтобы убрать маркер «обязательности» в UI, в схеме нужно явное необязательность:
 * `string().optional()`, `optional(string())` и т.п.
 */
export const isZodObjectFieldRequired = <T extends ZodObject>(
  schema: T,
  key: keyof T['shape'] & string,
): boolean => !schema.shape[key].isOptional();
