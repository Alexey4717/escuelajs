import type { Role } from '@/shared/api/generated/graphql';

const roleChangedToAdminMessage =
  'You will gain permissions to manage products and categories';
const roleChangedToCustomerMessage =
  'You will lose permissions to manage products and categories';

export const useRoleChangeWarning = ({
  currentRole,
  selectedRole,
}: {
  currentRole: Role;
  selectedRole: Role;
}) => {
  if (currentRole === selectedRole) {
    return null;
  }

  if (currentRole === 'customer' && selectedRole === 'admin') {
    return roleChangedToAdminMessage;
  }

  if (currentRole === 'admin' && selectedRole === 'customer') {
    return roleChangedToCustomerMessage;
  }

  return null;
};
