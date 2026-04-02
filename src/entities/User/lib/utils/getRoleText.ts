import { UserRoleText } from '../constants';
import { isUserRole } from './isUserRole';

export const getRoleText = (role?: string): string | undefined => {
  return isUserRole(role) ? UserRoleText[role] : role;
};
