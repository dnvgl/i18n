import { formatNumberToFixed } from "./formatNumberToFixed";
import { Locale } from "./types/locale";
import { NumberFormatFixed } from "./types/numberFormatFixed";

const defaultOptions: Partial<NumberFormatFixed> = { precision: 0 };

export function formatInteger(value: number, locale?: Locale): string {
  return formatNumberToFixed(value, defaultOptions, locale);
}