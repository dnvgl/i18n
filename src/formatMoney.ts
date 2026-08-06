import { formatNumberToFixed } from "./formatNumberToFixed.js";
import type { Locale } from "./types/locale.js";
import type { NumberFormatFixed } from "./types/numberFormatFixed.js";
import type { NumberFormatMoney } from "./types/numberFormatMoney.js";

const defaultOptions: Partial<NumberFormatFixed> = { precision: 2, useBankersRounding: true };

export function formatMoney(value: number, precision?: number, locale?: Locale): string
export function formatMoney(value: number, options?: Partial<NumberFormatMoney>, locale?: Locale): string
export function formatMoney(value: number, options?: number | Partial<NumberFormatMoney>, locale?: Locale): string {
  const formatOptions: Partial<NumberFormatFixed> = typeof options === "number"
    ? { 
      useBankersRounding: defaultOptions.useBankersRounding, 
      precision: options
    }
    : options !== undefined
      ? {
        useBankersRounding: defaultOptions.useBankersRounding, 
        precision: options.precision ?? defaultOptions.precision, 
        currency: options.currency,
        currencyDisplay: options.currencyDisplay,
        currencySign: options.currencySign
      }
      : defaultOptions

  return formatNumberToFixed(value, formatOptions, locale);
}