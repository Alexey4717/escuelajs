/**
 * Политики кеша Apollo: сгенерировано codegen-apollo-cache-plugin
 * в одном флоу с codegen (те же schema и documents). Не редактировать вручную.
 */
import { offsetLimitPagination } from '@apollo/client/utilities';

/** Сгенерировано codegen-apollo-cache-plugin. Не редактировать вручную. */
export const arraysPoliciesByOffsetLimit = {
  products: offsetLimitPagination([
    'categoryId',
    'categorySlug',
    'limit',
    'price',
    'price_max',
    'price_min',
    'title',
  ]),
} as const;

/** Нет полей Query с cursor пагинацией. */
export const arraysPoliciesByCursorLimit = {} as const;

/** Списки на Query с аргументами, не offset/cursor (явные keyArgs). Сгенерировано codegen-apollo-cache-plugin. */
export const queryListFieldsWithKeyArgs = {
  users: { keyArgs: ['limit'] },
} as const;

/** Нет полей Query с одиночной не-нормализованной сущностью. */
export const nonNormalizedQueryFields = {} as const;

/** Нет полей Query с массивом не-нормализованного типа без пагинации. */
export const nonNormalizedArrayQueryFields = {} as const;

/** Нет типов с merge или вложенной пагинацией. */
export const typePoliciesByType = {} as const;
