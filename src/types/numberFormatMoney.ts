import { IntlCurrencyDisplay } from "./intlCurrencyDisplay";
import { Iso4217Alpha3Code } from "./iso4217";

export interface NumberFormatMoney {
  precision: number;
  currency: Iso4217Alpha3Code;
  currencyDisplay: IntlCurrencyDisplay;
}