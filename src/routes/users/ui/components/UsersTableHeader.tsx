import { TableHead, TableHeader, TableRow } from '@/shared/ui/Table/Table';

export const UsersTableHeader = () => (
  <TableHeader className="bg-muted/50 [&_tr]:border-border">
    <TableRow className="border-border hover:bg-transparent">
      <TableHead
        scope="col"
        className="w-16 min-w-16 max-w-16 py-3 pl-4 pr-2 align-middle"
      >
        <span className="sr-only">Avatar</span>
      </TableHead>
      <TableHead
        scope="col"
        className="px-4 py-3 text-left text-[11px] font-semibold tracking-wide uppercase text-muted-foreground"
      >
        Name
      </TableHead>
      <TableHead
        scope="col"
        className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground"
      >
        Email
      </TableHead>
      <TableHead
        scope="col"
        className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground whitespace-nowrap"
      >
        Created
      </TableHead>
      <TableHead
        scope="col"
        className="px-4 py-3 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground"
      >
        Role
      </TableHead>
    </TableRow>
  </TableHeader>
);
