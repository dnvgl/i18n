import { Iso3166Alpha2Code, Iso3166Alpha3Code, Iso3166NumericCode } from "./types/iso3166";

const alpha2Codes: Iso3166Alpha2Code[] = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'];
const alpha3Codes: Iso3166Alpha3Code[] = ["AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE"];
const numericCodes: Iso3166NumericCode[] = [40, 56, 100, 191, 196, 203, 208, 233, 246, 250, 276, 300, 348, 372, 380, 428, 440, 442, 470, 528, 616, 620, 642, 703, 705, 724, 752];

export function isEuropeanUnionMember(code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): boolean {
  return typeof code === "string"
    ? code.length === 2
      ? alpha2Codes.includes(code)
      : code.length === 3
        ? alpha3Codes.includes(code)
        : false
    : numericCodes.includes(code);
}