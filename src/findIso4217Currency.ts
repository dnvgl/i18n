import { iso4217Currencies } from "./internal/iso4217Currencies";
import { Iso4217Alpha3Code, Iso4217Currency, Iso4217NumericCode } from "./types/iso4217";

export function findIso4217Currency(code: Iso4217Alpha3Code | Iso4217NumericCode): Iso4217Currency | undefined {
  if (code === 532) {
    // HINT: edge case with duplicated numeric code (for some period both are active currencies)
    const xcgCurrency = iso4217Currencies.find(x => x.alpha3Code === "XCG")!;
    const angCurrency = iso4217Currencies.find(x => x.alpha3Code === "ANG")!;
    const now = new Date();

    if (now >= new Date(xcgCurrency.introducedIn!)) {
      if (new Date(angCurrency.historicalFrom!) <= now) {
        console?.warn?.("In the current period there are two active currencies with the same currency numerical code."
          + " The new XCG currency is returned for this period, which will ultimately replace ANG."
          + " To make sure you select the intended currency please use alpha 3 code.");
      }

      return xcgCurrency;
    }

    return angCurrency;
  }

  const predicate: (value: Iso4217Currency) => boolean =
    typeof code === "string"
      ? x => x.alpha3Code === code
      : x => x.numericCode === code;

  return iso4217Currencies.find(predicate);
}