import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';

export function isUserRole(role?: string): role is Role {
  if (!role) return false;
  return role in UserRoleText;
}
