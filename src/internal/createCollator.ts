import { Locale } from "../types/locale";

/** @internal */
export function createCollator(locale?: Locale, options?: Intl.CollatorOptions): Intl.Collator {
  return new Intl.Collator(locale, options);
}