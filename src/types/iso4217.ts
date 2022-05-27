export interface Iso4217Currency {
  alpha3Code: Iso4217Alpha3Code;
  currencyName: string;
  numericCode: Iso4217NumericCode;
  minorUnit: number|null;
  isFund?: true;
}

export type Iso4217Alpha3Code = string;
export type Iso4217NumericCode = number;