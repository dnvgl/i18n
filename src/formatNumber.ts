import { createNumberFormat } from "./createNumberFormat";
import { roundUsingBankersMethod } from "./roundUsingBankersMethod";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";
import { NumberFormatIntl } from "./types/numberFormatIntl";

export function formatNumber(value: number, options?: Partial<NumberFormat>, locale?: Locale): string
export function formatNumber(value: number, options?: NumberFormatIntl): string
export function formatNumber(value: number, options?: Partial<NumberFormat> | NumberFormatIntl, locale?: Locale): string {
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
