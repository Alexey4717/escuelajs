/** Совпадает с `sliderThumbClassName`: `size-3` = 0.75rem. */
export function thumbLabelLeft(frac: number): string {
  return `calc(0.375rem + (100% - 0.75rem) * ${frac})`;
}
