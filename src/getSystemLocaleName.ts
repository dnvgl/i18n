import { Locale } from "./types/locale";

export function getSystemLocaleName(locale?: Locale): string {
  return new Intl.NumberFormat(locale).resolvedOptions().locale;
}