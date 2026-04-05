import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';

/**
 * Приводит строку роли с API к `Role`. Неизвестные значения считаем `customer`
 * (как обычного пользователя магазина).
 */
export function parseUserRole(role: string): Role {
  const n = role.trim().toLowerCase();
  if (n in UserRoleText) {
    return n as Role;
  }
  return 'customer';
}
