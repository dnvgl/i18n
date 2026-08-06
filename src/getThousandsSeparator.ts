import { getSeparator } from "./internal/getSeparator.js";
import type { Locale } from "./types/locale.js";

export function getThousandsSeparator(locale?: Locale): string {
  return getSeparator(10000, "group", undefined, locale);
}