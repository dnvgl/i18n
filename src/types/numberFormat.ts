import { NumberFormatBase } from "./numberFormatBase";

export interface NumberFormat extends NumberFormatBase {
  minPrecision: number;
  maxPrecision: number;
}