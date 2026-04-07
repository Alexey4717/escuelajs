import { Role } from '@/shared/api/generated/graphql';

export const UserRoleText = {
  admin: 'Администратор',
  customer: 'Покупатель',
} as const satisfies Record<Role, string>;
