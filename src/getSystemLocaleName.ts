import type { Locale } from "./types/locale.js";

export function getSystemLocaleName(locale?: Locale): string {
  return new Intl.NumberFormat(locale).resolvedOptions().locale;
}