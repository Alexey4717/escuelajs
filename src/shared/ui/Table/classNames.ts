export const tableContainerClassName = 'relative w-full overflow-x-auto';

export const tableRootClassName = 'w-full caption-bottom text-sm';

export const tableHeaderClassName = '[&_tr]:border-b';

export const tableBodyClassName = '[&_tr:last-child]:border-0';

export const tableFooterClassName =
  'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0';

export const tableRowClassName =
  'border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted';

export const tableHeadClassName =
  'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0';

export const tableCellClassName =
  'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0';

export const tableCaptionClassName = 'mt-4 text-sm text-muted-foreground';
