/**
 * Единое место для Next.js cache tags.
 *
 * Принцип:
 * - **одна функция/строка — один доменный тег**
 * - не храним хардкодом строки по всему проекту
 * - все новые теги добавляем сюда, чтобы их было легко искать/рефакторить
 */

export const nextCacheTags = {
  categories: 'categories',
  category: (categoryId: string) => `category:${categoryId}`,
  products: 'products',
  product: (productId: string) => `product:${productId}`,
  users: 'users',
  user: (userId: string) => `user:${userId}`,
} as const;
