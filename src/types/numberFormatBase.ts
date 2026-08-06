import type { IntlCurrencyDisplay } from "./intlCurrencyDisplay.js";
import type { IntlCurrencySign } from "./intlCurrencySign.js";
import type { Iso4217Alpha3Code, Iso4217NumericCode } from "./iso4217.js";

export interface NumberFormatBase {
  thousandsSeparator: boolean;
  useBankersRounding: boolean;
  negativeZero: boolean;
  currency: Iso4217Alpha3Code | Iso4217NumericCode;
  currencyDisplay: IntlCurrencyDisplay;
  currencySign: IntlCurrencySign;
}