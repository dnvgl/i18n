import { IntlCurrencyDisplay } from "./intlCurrencyDisplay";
import { IntlCurrencySign } from "./intlCurrencySign";
import { Iso4217Alpha3Code, Iso4217NumericCode } from "./iso4217";

export interface NumberFormatBase {
  thousandsSeparator: boolean;
  useBankersRounding: boolean;
  negativeZero: boolean;
  currency: Iso4217Alpha3Code | Iso4217NumericCode;
  currencyDisplay: IntlCurrencyDisplay;
  currencySign: IntlCurrencySign;
}