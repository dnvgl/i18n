import { IntlCurrencyDisplay } from "./intlCurrencyDisplay";
import { Iso4217Alpha3Code } from "./iso4217";

export interface NumberFormatBase {
  thousandsSeparator: boolean;
  useBankersRounding: boolean;
  negativeZero: boolean;
  currency: Iso4217Alpha3Code;
  currencyDisplay: IntlCurrencyDisplay;
}