import { useIsLgAndUp } from '@/shared/lib/hooks/use-is-lg-and-up';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface CheckoutFormSkeletonProps {
  titleClassName: string;
  submitClassName: string;
  className?: string;
}

function CheckoutFormSkeleton({
  titleClassName,
  submitClassName,
  className,
}: CheckoutFormSkeletonProps) {
  return (
    <div className={className}>
      <Skeleton className={titleClassName} />
      <Skeleton className="h-10 rounded-md" />
      <Skeleton className="h-10 rounded-md" />
      <Skeleton className="h-10 rounded-md" />
      <Skeleton className={submitClassName} />
    </div>
  );
}

export function CartCheckoutSectionLoad() {
  const isLg = useIsLgAndUp();

  if (isLg) {
    return (
      <section
        className="mt-0 space-y-4 border-t-0 pt-0 lg:sticky lg:self-start"
        data-testid="cartRoute__section__checkout"
        data-onboarding={ONBOARDING_TARGET_IDS.cartCheckout}
        aria-hidden
      >
        <CheckoutFormSkeleton
          className="space-y-3"
          titleClassName="h-8 w-44 rounded-md"
          submitClassName="h-24 rounded-md"
        />
      </section>
    );
  }

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-0 rounded-t-xl border-x border-t bg-popover p-0 text-popover-foreground shadow-lg"
      style={{ height: '70dvh' }}
      aria-hidden
    >
      <div className="flex items-center justify-center py-2">
        <Skeleton className="h-1 w-[100px] rounded-full" />
      </div>
      <CheckoutFormSkeleton
        className="space-y-3 px-4 pb-4 pt-2"
        titleClassName="h-8 w-40 rounded-md"
        submitClassName="h-20 rounded-md"
      />
    </section>
  );
}
