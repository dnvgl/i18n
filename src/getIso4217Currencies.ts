import { iso4217Currencies } from "./internal/iso4217Currencies";
import { Iso4217Currency } from "./types/iso4217";

export function getIso4217Currencies(): Iso4217Currency[] {
  return iso4217Currencies;
}