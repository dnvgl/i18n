export interface Iso3166Country {
  countryName: string;
  officialStateName: string;
  alpha2Code: Iso3166Alpha2Code;
  alpha3Code: Iso3166Alpha3Code;
  numericCode: Iso3166NumericCode;
}

export type Iso3166Alpha2Code = string;
export type Iso3166Alpha3Code = string;
export type Iso3166NumericCode = number;