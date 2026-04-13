import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

export interface CartCheckoutSectionProps {
  onOrder: () => void;
}

export function CartCheckoutSection({ onOrder }: CartCheckoutSectionProps) {
  return (
    <section
      className="mt-8 space-y-4 border-t border-border pt-6"
      data-testid="cartRoute__section__checkout"
    >
      <Typography variant="h2" component="h2" className="text-xl font-semibold">
        Оформить заказ
      </Typography>
      <Button
        type="button"
        size="lg"
        data-testid="cartRoute__button__placeOrder"
        onClick={onOrder}
      >
        Заказать
      </Button>
    </section>
  );
}
