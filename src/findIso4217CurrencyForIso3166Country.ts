import { iso3166Countries } from "./internal/iso3166Countries";
import { iso3166CountryToIso4217Currency } from "./internal/iso3166CountryToIso4217Currency";
import { iso4217Currencies } from "./internal/iso4217Currencies";
import { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166NumericCode } from "./types/iso3166";
import { Iso4217Currency } from "./types/iso4217";

export function findIso4217CurrencyForIso3166Country(code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): Iso4217Currency | undefined {
  const countryAlpha3Code = typeof code === "string"
    ? code.length === 3
      ? code
      : iso3166Countries.find(x => x.alpha2Code === code)?.alpha3Code
    : iso3166Countries.find(x => x.numericCode === code)?.alpha3Code;

  if (!countryAlpha3Code) {
    return undefined;
  }

  const currencyAlpha3Code = iso3166CountryToIso4217Currency.get(countryAlpha3Code);

  if (!currencyAlpha3Code) {
    return undefined;
  }

  return iso4217Currencies.find(x => x.alpha3Code === currencyAlpha3Code);
}