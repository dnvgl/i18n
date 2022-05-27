import { iso4217Currencies } from "./internal/iso4217Currencies";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./types/iso4217";

export function isValidIso4217Code(code: Iso4217Alpha3Code | Iso4217NumericCode): boolean {
  return typeof code === "string"
    ? code.length === 3
      ? iso4217Currencies.some(x => x.alpha3Code === code)
      : false
    : (code > 0 && code < 1000)
      ? iso4217Currencies.some(x => x.numericCode === code)
      : false;
}