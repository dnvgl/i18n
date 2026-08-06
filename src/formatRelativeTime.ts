import { createRelativeTimeFormat } from "./internal/createRelativeTimeFormat.js";
import type { Locale } from "./types/locale.js";

export function formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions, locale?: Locale): string {
  return createRelativeTimeFormat(locale, options).format(value, unit);
}