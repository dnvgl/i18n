import { formatNumber } from "./formatNumber";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";
import { NumberFormatFixed } from "./types/numberFormatFixed";

const defaultOptions: Partial<NumberFormat> = { 
  minPrecision: 2,
  maxPrecision: 2
}

export function formatNumberToFixed(value: number, precision?: number, locale?: Locale): string
export function formatNumberToFixed(value: number, options?: Partial<NumberFormatFixed>, locale?: Locale): string
export function formatNumberToFixed(value: number, options?: Partial<NumberFormatFixed> | number, locale?: Locale): string {
  const isNumberArg = options !== undefined && typeof options === "number",
    fixedPrecision = isNumberArg ? options : options?.precision ?? defaultOptions.minPrecision,
    thousandsSeparator = isNumberArg ? undefined : options?.thousandsSeparator,
    useBankersRounding = isNumberArg ? undefined : options?.useBankersRounding;

  // HINT: micro optimization to don't allocate memory when not needed
  const formatOptions = (fixedPrecision === defaultOptions.minPrecision 
    && thousandsSeparator === undefined 
    && useBankersRounding === undefined)
      ? defaultOptions 
      : { 
      minPrecision: fixedPrecision,
      maxPrecision: fixedPrecision,
      thousandsSeparator: thousandsSeparator,
      useBankersRounding: useBankersRounding
    };

  return formatNumber(value, formatOptions, locale);
}