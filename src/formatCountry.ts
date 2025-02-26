import { findIso3166Country } from "./findIso3166Country";
import { isCharAtoZUppercase } from "./internal/isCharAtoZUppercase";
import { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166NumericCode } from "./types/iso3166";
import { Locale } from "./types/locale";

let intlDisplayNamesCache: Intl.DisplayNames | null = null,
  cachedLocale: Locale | undefined = undefined;

export function formatCountry(country: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode, locale?: Locale): string {
  const countryAlpha2Code = (typeof country === "string" && country.length === 2)
    ? (isCharAtoZUppercase(country.charCodeAt(0)) && isCharAtoZUppercase(country.charCodeAt(1)))
      ? country
      : undefined
    : findIso3166Country(country)?.alpha2Code;

  if (countryAlpha2Code === undefined) {
    return returnUnsupportedCountry(country);
  }

  if (intlDisplayNamesCache === null || locale !== cachedLocale) {
    if (typeof Intl.DisplayNames === "undefined") {
      // HINT: Safari 14.0 (v14.1 is fine)
      return findIso3166Country(country)?.countryName ?? returnUnsupportedCountry(country);
    }

    intlDisplayNamesCache = new Intl.DisplayNames(locale, { type: "region" });
    cachedLocale = locale;
  }

  return intlDisplayNamesCache.of(countryAlpha2Code)!;
}

function returnUnsupportedCountry(country: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): string {
  return typeof country === "string" ? country : "";
}