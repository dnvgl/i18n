import { findIso4217Currency } from "./findIso4217Currency";
import { createNumberFormatIntlObj } from "./internal/createNumberFormatIntlObj";
import { Locale } from "./types/locale";
import { NumberFormat } from "./types/numberFormat";
import { NumberFormatIntl } from "./types/numberFormatIntl";

export function createNumberFormat(options?: Partial<NumberFormat>, locale?: Locale): NumberFormatIntl {
  return {
    numberFormat: createNumberFormatIntlObj(locale, createFormatterOptions(options)),
    useBankersRounding: options?.useBankersRounding,
    negativeZero: options?.negativeZero,
    maxPrecision: options?.maxPrecision
  }
}

function createFormatterOptions(opts?: Partial<NumberFormat>): Intl.NumberFormatOptions {
  const minimumFractionDigits = opts?.minPrecision,
    maximumFractionDigits = opts?.maxPrecision ?? 10,
    style = opts?.currency ? "currency" : "decimal",
    currency = opts?.currency !== undefined
      ? typeof opts.currency === "string"
        ? opts.currency
        : findIso4217Currency(opts.currency)?.alpha3Code
      : undefined;

  return {
    style: style,
    currency: currency,
    currencyDisplay: style === "currency" 
      ? opts?.currencyDisplay ?? "symbol" 
      : undefined,
    currencySign: opts?.currencySign,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
    useGrouping:opts?.thousandsSeparator === false ? false : true
  };
}
