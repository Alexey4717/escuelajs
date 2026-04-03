/** Ссылка на `Category` в нормализованном кеше Apollo для `useFragment({ from })`. */
export function categoryCacheRef(id: string) {
  return { __typename: 'Category' as const, id };
}
