import { iso3166Countries } from "./internal/iso3166Countries.js";
import { isValidIbanStructure } from "./internal/isValidIbanStructure.js";
import { removeWhitespaces } from "./internal/removeWhitespaces.js";
import type { IbanParseOptions } from "./types/ibanParseOptions.js";
import type { Iso3166Alpha2Code } from "./types/iso3166.js";

export function getCountryCodeFromIban(iban: string, options?: Partial<IbanParseOptions>): Iso3166Alpha2Code | "XK" | undefined {
  if (options?.removeWhitespaces === true) {
    iban = removeWhitespaces(iban);
  }

  if (options?.validateStructure !== false && !isValidIbanStructure(iban)) {
    return undefined;
  }

  const code = iban.substring(0, 2);

  if (code === "XK") {
    return "XK"; // HINT: Kosovo country
  }

  if (iso3166Countries.some(x => x.alpha2Code === code)) {
    return code;
  }

  return undefined;
}