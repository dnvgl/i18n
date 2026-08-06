import type { NumberFormat } from "./numberFormat.js";

export interface NumberFormatIntl extends Pick<Partial<NumberFormat>, "useBankersRounding" | "negativeZero" | "maxPrecision"> {
  numberFormat: Intl.NumberFormat
}