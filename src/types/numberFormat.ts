import type { NumberFormatBase } from "./numberFormatBase.js";

export interface NumberFormat extends NumberFormatBase {
  minPrecision: number;
  maxPrecision: number;
}