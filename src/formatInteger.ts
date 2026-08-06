import { formatNumberToFixed } from "./formatNumberToFixed.js";
import type { Locale } from "./types/locale.js";
import type { NumberFormatFixed } from "./types/numberFormatFixed.js";

const defaultOptions: Partial<NumberFormatFixed> = { precision: 0 };

export function formatInteger(value: number, locale?: Locale): string {
  return formatNumberToFixed(value, defaultOptions, locale);
}