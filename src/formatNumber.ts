import { createNumberFormat } from "./createNumberFormat.js";
import { roundUsingBankersMethod } from "./roundUsingBankersMethod.js";
import type { Locale } from "./types/locale.js";
import type { NumberFormat } from "./types/numberFormat.js";
import type { NumberFormatIntl } from "./types/numberFormatIntl.js";

export function formatNumber(value: number, options?: Partial<NumberFormat>, locale?: Locale): string
export function formatNumber(value: number, options?: NumberFormatIntl): string
export function formatNumber(value: number, options?: Partial<NumberFormat> | NumberFormatIntl, locale?: Locale): string {
  if (options?.useBankersRounding && options?.maxPrecision !== undefined) {
    value = roundUsingBankersMethod(value, options.maxPrecision);
  }
  
  const formatOptions = (options as NumberFormatIntl)?.numberFormat !== undefined 
    ? (options as NumberFormatIntl) 
    : createNumberFormat(options, locale);

  const formattedValue = formatOptions.numberFormat.format(value);

  if (options?.negativeZero === false && value <= 0) {
    return formatOptions.numberFormat.format(-0) === formattedValue 
      ? formatOptions.numberFormat.format(0) 
      : formattedValue;
  }

  return formattedValue;
}
