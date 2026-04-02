import { cva } from 'class-variance-authority';

/**
 * Стили из https://ui.shadcn.com/docs/components/radix/typography
 */
export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      body1: 'leading-7 [&:not(:first-child)]:mt-6',
      body2: 'text-sm leading-6 [&:not(:first-child)]:mt-6',
      subtitle1: 'text-base font-normal leading-7',
      subtitle2: 'text-sm font-medium leading-snug',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground',
      caption: 'text-xs text-muted-foreground',
      overline:
        'text-xs font-medium uppercase tracking-wider text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      table: 'my-6 w-full overflow-y-auto',
      inherit: '',
    },
    align: {
      inherit: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    gutterBottom: {
      false: '',
      true: 'mb-2',
    },
    noWrap: {
      false: '',
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
  },
  defaultVariants: {
    variant: 'body1',
    align: 'inherit',
    gutterBottom: false,
    noWrap: false,
  },
});
