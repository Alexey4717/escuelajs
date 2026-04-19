'use client';

import { AlertTriangle } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Alert } from '@/shared/ui/Alert/Alert';

import { useCurrentUserRole } from '@/entities/Session';
import { parseUserRole } from '@/entities/User';

import { ProfileEditRoleField } from '../../lib/form/fields';
import type { ProfileEditFormStateOutput } from '../../lib/form/schema';
import { useRoleChangeWarning } from '../hooks/useRoleChangeWarning';

export const ProfileEditRoleSection = () => {
  const { role } = useCurrentUserRole();
  const { control } = useFormContext<ProfileEditFormStateOutput>();
  const selectedRole = useWatch({
    control,
    name: 'role',
  });
  const currentRole = role ? parseUserRole(role) : null;
  const roleChangeMessage = useRoleChangeWarning({
    currentRole: currentRole!,
    selectedRole,
  });

  return (
    <div className="space-y-2">
      <ProfileEditRoleField />
      {roleChangeMessage ? (
        <Alert
          title="Access level change"
          description={roleChangeMessage}
          icon={<AlertTriangle className="h-4 w-4" />}
          className="mt-2"
        />
      ) : null}
    </div>
  );
};
