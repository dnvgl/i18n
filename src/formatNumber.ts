import { createNumberFormat } from "./internal/createNumberFormat";
import { roundUsingBankersMethod } from "./roundUsingBankersMethod";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";

export function formatNumber(value: number, options?: Partial<NumberFormat>, locale?: Locale): string {
  if (options?.useBankersRounding && options?.maxPrecision !== undefined) {
    value = roundUsingBankersMethod(value, options.maxPrecision);
  }
  
  return createNumberFormat(locale, createFormatterOptions(options)).format(value);
}

function createFormatterOptions(opts?: Partial<NumberFormat>): Intl.NumberFormatOptions {
  const minimumFractionDigits = opts?.minPrecision,
    maximumFractionDigits = opts?.maxPrecision ?? 10,
    useGrouping = opts?.thousandsSeparator === false ? false : true;

  return {
    style: "decimal",
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
    useGrouping: useGrouping
  };
}