import { Locale } from "../types/locale";

/** @internal */
export function createDateFormat(locale?: Locale, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, options);
}