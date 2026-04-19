import { cn } from '../../../lib/styles/cn';

interface FilesBoxLimitHintProps {
  overLimit: boolean;
  atLimit: boolean;
  text: string;
}

export const FilesBoxLimitHint = ({
  overLimit,
  atLimit,
  text,
}: FilesBoxLimitHintProps) => {
  if (!atLimit && !overLimit) return null;

  return (
    <p
      className={cn(
        'text-sm',
        overLimit ? 'text-destructive' : 'text-muted-foreground',
      )}
    >
      {text}
    </p>
  );
};
