import { iso3166Countries } from "./internal/iso3166Countries";
import { isValidBicStructure } from "./internal/isValidBicStructure";
import { Iso3166Alpha2Code } from "./types/iso3166";

export function getCountryCodeFromBic(bic: string): Iso3166Alpha2Code | "XK" | undefined {
  if (!isValidBicStructure(bic)) {
    return undefined;
  }

  const code = bic.substring(4, 6);

  if (code === "XK") {
    return "XK";
  }

  if (iso3166Countries.some(x => x.alpha2Code === code)) {
    return code;
  }

  return undefined;
}