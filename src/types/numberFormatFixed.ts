import type { NumberFormatBase } from "./numberFormatBase";

export interface NumberFormatFixed extends NumberFormatBase {
  precision: number;
}