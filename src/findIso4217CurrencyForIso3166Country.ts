import { iso3166Countries } from "./internal/iso3166Countries.js";
import { iso3166CountryToIso4217Currency } from "./internal/iso3166CountryToIso4217Currency.js";
import { iso4217Currencies } from "./internal/iso4217Currencies.js";
import { toDateKey } from "./internal/toDateKey.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import type { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166NumericCode } from "./types/iso3166.js";
import type { Iso4217Currency } from "./types/iso4217.js";

// HINT: intentionally returns the shared object from the internal list (same instance as in getIso4217Currencies()); callers must not mutate it
export function findIso4217CurrencyForIso3166Country(
  code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode,
  statusForTheDay?: Date | DateIsoString): Iso4217Currency | undefined {
  const countryAlpha3Code = typeof code === "string"
    ? code.length === 3
      ? code
      : iso3166Countries.find(x => x.alpha2Code === code)?.alpha3Code
    : iso3166Countries.find(x => x.numericCode === code)?.alpha3Code;

  if (!countryAlpha3Code) {
    return undefined;
  }

  const resolver = iso3166CountryToIso4217Currency.get(countryAlpha3Code);

  if (!resolver) {
    return undefined;
  }

  if (typeof resolver === "string") {
    return iso4217Currencies.find(x => x.alpha3Code === resolver);
  }

  const resolvedCurrencyAlpha3CodeByDate = resolver(toDateKey(statusForTheDay));

  return iso4217Currencies.find(x => x.alpha3Code === resolvedCurrencyAlpha3CodeByDate);
}