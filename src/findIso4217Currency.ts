import { iso4217Currencies } from "./internal/iso4217Currencies";
import { Iso4217Alpha3Code, Iso4217Currency, Iso4217NumericCode } from "./types/iso4217";

export function findIso4217Currency(code: Iso4217Alpha3Code | Iso4217NumericCode): Iso4217Currency | undefined {
  const predicate: (value: Iso4217Currency) => boolean =
    typeof code === "string"
      ? x => x.alpha3Code === code
      : x => x.numericCode === code;

  return iso4217Currencies.find(predicate);
}