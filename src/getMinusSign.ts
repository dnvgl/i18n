import { getSeparator } from "./internal/getSeparator";
import type { Locale } from "./types/locale";

export function getMinusSign(locale?: Locale): string {
  return getSeparator(-1, "minusSign", undefined, locale);
}