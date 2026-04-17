import { Role } from '@/shared/api/generated/graphql';

export const UserRoleText = {
  admin: 'Administrator',
  customer: 'Customer',
} as const satisfies Record<Role, string>;
