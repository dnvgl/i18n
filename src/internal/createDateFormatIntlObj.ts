import { Locale } from "../types/locale";

/** @internal */
export function createDateFormatIntlObj(locale?: Locale, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, options);
}