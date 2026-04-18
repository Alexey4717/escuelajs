export const BREAKPOINTS_PX = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

export const MEDIA_QUERIES = {
  mobileOnly: `(max-width: ${BREAKPOINTS_PX.md - 1}px)`,
  smAndUp: `(min-width: ${BREAKPOINTS_PX.sm}px)`,
  mdAndUp: `(min-width: ${BREAKPOINTS_PX.md}px)`,
  lgAndUp: `(min-width: ${BREAKPOINTS_PX.lg}px)`,
} as const;
