import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';

export const parseUserRole = (role: string): Role => {
  const n = role.trim().toLowerCase();
  if (n in UserRoleText) {
    return n as Role;
  }
  return 'customer';
};
