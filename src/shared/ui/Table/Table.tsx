'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { TableBody } from './components/TableBody';
import { TableCaption } from './components/TableCaption';
import { TableCell } from './components/TableCell';
import { TableContainer } from './components/TableContainer';
import { TableFooter } from './components/TableFooter';
import { TableHead } from './components/TableHead';
import { TableHeader } from './components/TableHeader';
import { TableRoot } from './components/TableRoot';
import { TableRow } from './components/TableRow';

export type TableProps = ComponentProps<'table'> & {
  /** Подпись таблицы; при отсутствии блок не рендерится. */
  caption?: ReactNode;
  /** Содержимое `<tfoot>`; при отсутствии блок не рендерится. */
  footer?: ReactNode;
  /**
   * Обёртка с горизонтальным скроллом. Если `false` — только `<table>`
   * (удобно, когда скролл уже снаружи).
   */
  wrap?: boolean;
  /** Класс для контейнера-обёртки при `wrap === true`. */
  containerClassName?: string;
};

export const Table = ({
  caption,
  footer,
  wrap = true,
  containerClassName,
  className,
  children,
  ...tableProps
}: TableProps) => {
  const showCaption = caption != null && caption !== false;
  const showFooter = footer != null && footer !== false;

  const table = (
    <TableRoot className={className} {...tableProps}>
      {showCaption ? <TableCaption>{caption}</TableCaption> : null}
      {children}
      {showFooter ? <TableFooter>{footer}</TableFooter> : null}
    </TableRoot>
  );

  if (!wrap) {
    return table;
  }

  return (
    <TableContainer className={containerClassName}>{table}</TableContainer>
  );
};

export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
