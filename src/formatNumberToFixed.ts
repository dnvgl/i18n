import { formatNumber } from "./formatNumber";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";
import { NumberFormatFixed } from "./types/numberFormatFixed";

export function formatNumberToFixed(value: number, precision?: number, locale?: Locale): string
export function formatNumberToFixed(value: number, options?: Partial<NumberFormatFixed>, locale?: Locale): string
export function formatNumberToFixed(value: number, options?: Partial<NumberFormatFixed> | number, locale?: Locale): string {
  const isNumberArg = options !== undefined && typeof options === "number",
    fixedPrecision = isNumberArg ? options : options?.precision ?? 2 /* HINT: default */;

  const formatOptions: Partial<NumberFormat> = { 
    minPrecision: fixedPrecision,
    maxPrecision: fixedPrecision,
    thousandsSeparator: isNumberArg ? undefined : options?.thousandsSeparator,
    useBankersRounding: isNumberArg ? undefined : options?.useBankersRounding,
    negativeZero: isNumberArg ? undefined : options?.negativeZero,
    currency: isNumberArg ? undefined : options?.currency,
    currencyDisplay: isNumberArg ? undefined : options?.currencyDisplay,
    currencySign: isNumberArg ? undefined : options?.currencySign
  };
  
  return formatNumber(value, formatOptions, locale);
}