import { IntlCurrencyDisplay } from "./intlCurrencyDisplay";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./iso4217";

export interface CurrencySymbolOptions {
  currency: Iso4217Alpha3Code | Iso4217NumericCode;
  currencyDisplay?: IntlCurrencyDisplay;
}