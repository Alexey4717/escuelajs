import { Typography } from '@/shared/ui/Typography/Typography';

export const NoProductImagesFallback = () => (
  <div
    className="flex aspect-square w-full items-center justify-center rounded-3xl border border-border bg-muted"
    aria-hidden
  >
    <Typography variant="muted" className="text-sm">
      Нет фото
    </Typography>
  </div>
);
