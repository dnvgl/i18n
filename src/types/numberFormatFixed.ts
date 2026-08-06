import type { NumberFormatBase } from "./numberFormatBase.js";

export interface NumberFormatFixed extends NumberFormatBase {
  precision: number;
}