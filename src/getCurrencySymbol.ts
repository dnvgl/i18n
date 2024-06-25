import { findIso4217Currency } from "./findIso4217Currency";
import { getSeparator } from "./internal/getSeparator";
import { CurrencySymbolOptions } from "./types/currencySymbolOptions";
import { IntlCurrencyDisplay } from "./types/intlCurrencyDisplay";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./types/iso4217";
import { Locale } from "./types/locale";

export function getCurrencySymbol(currencyCode: Iso4217Alpha3Code | Iso4217NumericCode, locale?: Locale): string
export function getCurrencySymbol(currencyCode: CurrencySymbolOptions, locale?: Locale): string
export function getCurrencySymbol(options: Iso4217Alpha3Code | Iso4217NumericCode | CurrencySymbolOptions, locale?: Locale): string {
  if (typeof options === "string") {
    return getCurrencySymbolString(options, undefined, locale);
  }

  if (typeof options === "number") {
    return getCurrencySymbolString(findIso4217Currency(options)?.alpha3Code, undefined, locale);
  }

  const code = typeof options.currency === "string"
    ? options.currency
    : findIso4217Currency(options.currency)?.alpha3Code

  return getCurrencySymbolString(code, options.currencyDisplay, locale);
}

function getCurrencySymbolString(currency?: Iso4217Alpha3Code, currencyDisplay?: IntlCurrencyDisplay, locale?: Locale): string {
  if (!currency) {
    return "";
  }

  const intlOptions: Intl.NumberFormatOptions = { 
    style: "currency", 
    currency: currency, 
    currencyDisplay: currencyDisplay ?? "symbol" 
  };

  return getSeparator(1, "currency", intlOptions, locale);
}