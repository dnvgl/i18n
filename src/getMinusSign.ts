import { getSeparator } from "./internal/getSeparator.js";
import type { Locale } from "./types/locale.js";

export function getMinusSign(locale?: Locale): string {
  return getSeparator(-1, "minusSign", undefined, locale);
}