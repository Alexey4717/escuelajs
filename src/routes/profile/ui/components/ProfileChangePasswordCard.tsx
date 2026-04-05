import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/TextField/components/Input';

const NEW_PASSWORD_INPUT_ID = 'profile-new-password';

export const ProfileChangePasswordCard = () => {
  return (
    <Card title="Сменить пароль" className="shadow-sm ring-border/60">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <label
            htmlFor={NEW_PASSWORD_INPUT_ID}
            className="text-[0.65rem] font-medium tracking-[0.06em] text-muted-foreground uppercase"
          >
            Новый пароль
          </label>
          <Input
            id={NEW_PASSWORD_INPUT_ID}
            type="password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="Новый пароль"
          />
        </div>
        <Button type="button" className="w-full sm:w-auto">
          Сохранить
        </Button>
      </div>
    </Card>
  );
};
