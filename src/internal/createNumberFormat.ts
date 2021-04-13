import { Locale } from "../types/locale";

/** @internal */
export function createNumberFormat(locale?: Locale, options?: Intl.NumberFormatOptions): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, options);
}