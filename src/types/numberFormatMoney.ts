import type { IntlCurrencyDisplay } from "./intlCurrencyDisplay";
import type { IntlCurrencySign } from "./intlCurrencySign";
import type { Iso4217Alpha3Code, Iso4217NumericCode } from "./iso4217";

export interface NumberFormatMoney {
  precision: number;
  currency: Iso4217Alpha3Code | Iso4217NumericCode;
  currencyDisplay: IntlCurrencyDisplay;
  currencySign: IntlCurrencySign;
}