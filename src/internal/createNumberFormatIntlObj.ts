import { Locale } from "../types/locale";

/** @internal */
export function createNumberFormatIntlObj(locale?: Locale, options?: Intl.NumberFormatOptions): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, options);
}