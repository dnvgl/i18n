import { createRelativeTimeFormat } from "./internal/createRelativeTimeFormat";
import { Locale } from "./types/locale";

export function formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions, locale?: Locale): string {
  return createRelativeTimeFormat(locale, options).format(value, unit);
}