import { createNumberFormat } from "./internal/createNumberFormat";
import { roundUsingBankersMethod } from "./roundUsingBankersMethod";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";

export function formatNumber(value: number, options?: Partial<NumberFormat>, locale?: Locale): string {
  if (options?.useBankersRounding && options?.maxPrecision !== undefined) {
    value = roundUsingBankersMethod(value, options.maxPrecision);
  }

  const formatter = createNumberFormat(locale, createFormatterOptions(options)),
    formattedValue = formatter.format(value);

  if (options?.negativeZero === false && value <= 0) {
    return formatter.format(-0) === formattedValue 
      ? formatter.format(0) 
      : formattedValue;
  }

  return formattedValue;
}

function createFormatterOptions(opts?: Partial<NumberFormat>): Intl.NumberFormatOptions {
  const minimumFractionDigits = opts?.minPrecision,
    maximumFractionDigits = opts?.maxPrecision ?? 10,
    style = opts?.currency ? "currency" : "decimal";

  return {
    style: style,
    currency: opts?.currency,
    currencyDisplay: style === "currency" 
      ? opts?.currencyDisplay ?? "symbol" 
      : undefined,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
    useGrouping:opts?.thousandsSeparator === false ? false : true
  };
}