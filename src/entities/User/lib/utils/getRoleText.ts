import { Role } from '@/shared/api/generated/graphql';

import { UserRoleText } from '../constants';
import { isUserRole } from './isUserRole';

export const getRoleText = (role?: string): string | undefined => {
  if (!role) return undefined;
  const n = role.trim().toLowerCase();
  return isUserRole(n) ? UserRoleText[n as Role] : role;
};
