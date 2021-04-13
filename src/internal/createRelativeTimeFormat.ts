import { Locale } from "../types/locale";

/** @internal */
export function createRelativeTimeFormat(locale?: Locale, options?: Intl.RelativeTimeFormatOptions): Intl.RelativeTimeFormat {
  return new Intl.RelativeTimeFormat(locale, options);
}