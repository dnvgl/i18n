import { DateIsoString } from "../types/dateIsoString";

/** @internal */
export function convertToDate(value: Date | DateIsoString): Date {
  if (typeof value === 'string') {
    value = new Date(value);
  }

  return value;
}