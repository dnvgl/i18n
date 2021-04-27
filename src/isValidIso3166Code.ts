import { iso3166Countries } from "./internal/iso3166Countries";
import { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166NumericCode } from "./types/iso3166";

export function isValidIso3166Code(code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): boolean {
  return typeof code === "string"
    ? code.length === 2
      ? iso3166Countries.some(x => x.alpha2Code === code)
      : code.length === 3
        ? iso3166Countries.some(x => x.alpha3Code === code)
        : false
    : (code > 0 && code < 1000)
      ? iso3166Countries.some(x => x.numericCode === code)
      : false;
}