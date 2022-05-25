import { iso3166Countries } from "./internal/iso3166Countries";
import { isValidIbanStructure } from "./internal/isValidIbanStructure";
import { removeWhitespaces } from "./internal/removeWhitespaces";
import { IbanParseOptions } from "./types/ibanParseOptions";
import { Iso3166Alpha2Code } from "./types/iso3166";

export function getCountryCodeFromIban(iban: string, options?: Partial<IbanParseOptions>): Iso3166Alpha2Code | "XK" | undefined {
  if (options?.removeWhitespaces === true) {
    iban = removeWhitespaces(iban);
  }

  if (options?.validateStructure !== false && !isValidIbanStructure(iban)) {
    return undefined;
  }

  const code = iban.substring(0, 2);

  if (code === "XK") {
    return "XK";
  }

  if (iso3166Countries.some(x => x.alpha2Code === code)) {
    return code;
  }

  return undefined;
}