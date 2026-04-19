import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';

export const isUserRole = (role?: string): role is Role => {
  if (!role) return false;
  const n = role.trim().toLowerCase();
  return n in UserRoleText;
};
