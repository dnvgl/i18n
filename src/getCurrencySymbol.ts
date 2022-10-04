import { findIso4217Currency } from "./findIso4217Currency";
import { getSeparator } from "./internal/getSeparator";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./types/iso4217";
import { Locale } from "./types/locale";

export function getCurrencySymbol(currencyCode: Iso4217Alpha3Code | Iso4217NumericCode, locale?: Locale): string {
  const code = typeof currencyCode === "string"
    ? currencyCode
    : findIso4217Currency(currencyCode)?.alpha3Code;

  if (!code) {
    return "";
  }

  return getSeparator(1, "currency", { style: "currency", currency: code, currencyDisplay: "symbol" }, locale);
}