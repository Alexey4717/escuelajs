import { Role } from '@/shared/api/generated/graphql';

export const UserRoleText: Record<Role, string> = {
  admin: 'Администратор',
  customer: 'Покупатель',
};
