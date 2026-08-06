import type { DateIsoString } from "../types/dateIsoString.js";

/** @internal */
export function convertToDate(value: Date | DateIsoString): Date {
  if (typeof value === 'string') {
    value = new Date(value);
  }

  return value;
}