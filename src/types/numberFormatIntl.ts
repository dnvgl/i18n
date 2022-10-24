import { NumberFormat } from "./numberFormat";

export interface NumberFormatIntl extends Pick<Partial<NumberFormat>, "useBankersRounding" | "negativeZero" | "maxPrecision"> {
  numberFormat: Intl.NumberFormat
}