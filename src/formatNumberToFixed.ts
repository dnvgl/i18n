import { formatNumber } from "./formatNumber";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";
import { NumberFormatFixed } from "./types/numberFormatFixed";

const defaultOptions: Partial<NumberFormat> = { 
  minPrecision: 2,
  maxPrecision: 2
}

export function formatNumberToFixed(value: number, options?: Partial<NumberFormatFixed>, locale?: Locale): string {
  const fixedPrecision = options?.precision ?? defaultOptions.minPrecision;
  // HINT: micro optimization to don't allocate memory when not needed
  const formatOptions = (fixedPrecision === defaultOptions.minPrecision 
    && options?.thousandsSeparator === undefined 
    && options?.useBankersRounding === undefined)
      ? defaultOptions 
      : { 
      minPrecision: fixedPrecision,
      maxPrecision: fixedPrecision,
      thousandsSeparator: options?.thousandsSeparator,
      useBankersRounding: options?.useBankersRounding
    };

  return formatNumber(value, formatOptions, locale);
}