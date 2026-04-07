import type { Role } from '@/shared/api/generated/graphql';

const roleChangedToAdminMessage =
  'У вас появится право на управление продуктами и категориями';
const roleChangedToCustomerMessage =
  'У вас исчезнет право на управление продуктами и категориями';

export function useRoleChangeWarning({
  currentRole,
  selectedRole,
}: {
  currentRole: Role;
  selectedRole: Role;
}) {
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
}
