import { input, object, output, string, enum as zodEnum } from 'zod/v4';

import { Role } from '@/shared/api/generated/graphql';
import { emailSchema } from '@/shared/lib/form';

import { UserRoleText } from '@/entities/User';

type ProfileEditRoleOption = {
  [R in Role]: {
    value: R;
    label: (typeof UserRoleText)[R];
  };
}[Role];

const profileEditRoleOptions: ProfileEditRoleOption[] = [
  { value: 'customer', label: UserRoleText.customer },
  { value: 'admin', label: UserRoleText.admin },
];
const profileEditRoleValues = profileEditRoleOptions.map(
  (option) => option.value,
);

export const profileEditFormSchema = object({
  email: emailSchema.meta({
    formField: {
      label: 'Email',
      'data-testid': 'profileEdit__input__email',
    },
  }),
  name: string()
    .min(1, 'Введите имя')
    .meta({
      formField: {
        label: 'Имя',
        'data-testid': 'profileEdit__input__name',
      },
    }),
  role: zodEnum(profileEditRoleValues).meta({
    formField: {
      label: 'Роль',
      'data-testid': 'profileEdit__select__role',
      options: profileEditRoleOptions,
    },
  }),
  avatar: string()
    .min(1, 'Введите URL аватара')
    .meta({
      formField: {
        label: 'URL аватара',
        'data-testid': 'profileEdit__input__avatar',
      },
    }),
});

export type ProfileEditFormStateInput = input<typeof profileEditFormSchema>;
export type ProfileEditFormStateOutput = output<typeof profileEditFormSchema>;
