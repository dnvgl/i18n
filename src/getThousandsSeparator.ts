import { getSeparator } from "./internal/getSeparator";
import type { Locale } from "./types/locale";

export function getThousandsSeparator(locale?: Locale): string {
  return getSeparator(10000, "group", undefined, locale);
}