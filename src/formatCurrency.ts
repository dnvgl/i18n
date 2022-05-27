import { Locale } from "./types/locale";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./types/iso4217";
import { findIso4217Currency } from "./findIso4217Currency";
import { isCharAtoZUppercase } from "./internal/isCharAtoZUppercase";

let intlDisplayNamesCache: Intl.DisplayNames | null = null,
  cachedLocale: Locale | undefined = undefined;

export function formatCurrency(currency: Iso4217Alpha3Code | Iso4217NumericCode, locale?: Locale): string {
  const currencyAlpha3Code = typeof currency === "string"
    ? (currency.length === 3 
        && isCharAtoZUppercase(currency.charCodeAt(0))
        && isCharAtoZUppercase(currency.charCodeAt(1))
        && isCharAtoZUppercase(currency.charCodeAt(2)))
      ? currency
      : undefined
    : findIso4217Currency(currency)?.alpha3Code;

  if (currencyAlpha3Code === undefined) {
    return returnUnsupportedCurrency(currency);
  }

  if (intlDisplayNamesCache === null || locale !== cachedLocale) {
    if (typeof Intl.DisplayNames === "undefined") {
      // HINT: Safari 14.0 (v14.1 is fine)
      return findIso4217Currency(currency)?.currencyName ?? returnUnsupportedCurrency(currency);
    }

    intlDisplayNamesCache = new Intl.DisplayNames(locale, { type: "currency" });
    cachedLocale = locale;
  }

  return intlDisplayNamesCache.of(currencyAlpha3Code)!;
}

function returnUnsupportedCurrency(currency: Iso4217Alpha3Code | Iso4217NumericCode): string {
  return typeof currency === "string" ? currency : "";
}