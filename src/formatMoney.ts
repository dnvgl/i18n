import { formatNumberToFixed } from "./formatNumberToFixed";
import { Locale } from "./types/locale";
import { NumberFormatFixed } from "./types/numberFormatFixed";

const defaultOptions: Partial<NumberFormatFixed> = { precision: 2, useBankersRounding: true };

export function formatMoney(value: number, precision: number = 2, locale?: Locale): string {
  // HINT: micro optimization to don't allocate memory when not needed
  const formatOptions = precision === defaultOptions.precision 
    ? defaultOptions 
    : { precision: precision, useBankersRounding: defaultOptions.useBankersRounding };

  return formatNumberToFixed(value, formatOptions, locale);
}