import { iso3166Countries } from "./internal/iso3166Countries";
import { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166Country, Iso3166NumericCode } from "./types/iso3166";

export function findIso3166Country(code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): Iso3166Country | undefined {
  const predicate: (value: Iso3166Country) => boolean =
    typeof code === "string"
      ? code.length === 2
        ? x => x.alpha2Code === code
        : x => x.alpha3Code === code
      : x => x.numericCode === code;

  return iso3166Countries.find(predicate);
}