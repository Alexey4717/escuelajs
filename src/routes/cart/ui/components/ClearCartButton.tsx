import { Button } from '@/shared/ui/Button/Button';

export interface ClearCartButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

export function ClearCartButton({
  onClear,
  disabled = false,
}: ClearCartButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="text-muted-foreground hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
      aria-label="Очистить корзину"
      disabled={disabled}
      onClick={onClear}
      data-testid="cartRoute__button__clearCart"
    >
      Очистить корзину
    </Button>
  );
}
