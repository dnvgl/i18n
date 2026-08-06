import { getSeparator } from "./internal/getSeparator.js";
import type { Locale } from "./types/locale.js";

export function getDecimalSeparator(locale?: Locale): string {
  return getSeparator(1.1, "decimal", undefined, locale);
}