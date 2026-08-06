import type { Locale } from "../types/locale.js";

/** @internal */
export function createRelativeTimeFormat(locale?: Locale, options?: Intl.RelativeTimeFormatOptions): Intl.RelativeTimeFormat {
  return new Intl.RelativeTimeFormat(locale, options);
}