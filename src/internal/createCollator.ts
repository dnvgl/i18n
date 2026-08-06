import type { Locale } from "../types/locale.js";

/** @internal */
export function createCollator(locale?: Locale, options?: Intl.CollatorOptions): Intl.Collator {
  return new Intl.Collator(locale, options);
}