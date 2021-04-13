import { getSeparator } from "./internal/getSeparator";
import { Locale } from "./types/locale";

export function getDecimalSeparator(locale?: Locale): string {
  return getSeparator(1.1, "decimal", undefined, locale);
}