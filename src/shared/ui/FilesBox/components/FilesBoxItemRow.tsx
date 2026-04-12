import { RotateCwIcon, Trash2Icon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import { AppImage } from '../../AppImage/AppImage';
import { Button } from '../../Button/Button';
import type { FilesBoxItem } from '../types';
import { formatFileSize } from '../utils/files-box-utils';

interface FilesBoxItemRowProps {
  item: FilesBoxItem;
  disabled?: boolean;
  onToggleRemoval: (localId: string) => void;
}

export function FilesBoxItemRow({
  item,
  disabled,
  onToggleRemoval,
}: FilesBoxItemRowProps) {
  const marked = item.status === 'marked_for_removal';

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-border bg-card p-2 pr-1.5">
      <div
        className={cn(
          'relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted',
          marked && 'opacity-60',
        )}
      >
        {item.previewUrl ? (
          <AppImage
            src={item.previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[0.65rem] text-muted-foreground"
            aria-hidden
          >
            Нет превью
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium text-foreground',
            marked && 'text-muted-foreground',
          )}
        >
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(item.size)}
        </p>
        {item.error ? (
          <p className="text-xs text-destructive">{item.error}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center justify-center">
        {marked ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={disabled}
            title="Восстановить файл"
            aria-label={`Восстановить файл «${item.name}»`}
            className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            onClick={() => onToggleRemoval(item.localId)}
          >
            <RotateCwIcon />
          </Button>
        ) : (
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            disabled={disabled}
            className="border border-destructive/20 bg-background/80 text-destructive shadow-sm hover:bg-destructive/15"
            title="Удалить файл"
            aria-label={`Удалить файл «${item.name}»`}
            onClick={() => onToggleRemoval(item.localId)}
          >
            <Trash2Icon />
          </Button>
        )}
      </div>
    </li>
  );
}
