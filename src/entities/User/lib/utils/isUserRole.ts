import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';

export function isUserRole(role?: string): role is Role {
  if (!role) return false;
  const n = role.trim().toLowerCase();
  return n in UserRoleText;
}
