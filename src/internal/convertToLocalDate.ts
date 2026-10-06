import type { DateIsoString } from "../types/dateIsoString.js";
import { convertToDate } from "./convertToDate.js";

/** @internal */
export function convertToLocalDate(value: Date | DateIsoString): Date {
  const date = convertToDate(value);

  // HINT: unlike date-fns/moment, native Date parses a date-only ISO string as UTC midnight
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(date.getTime())
    ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    : date;
}
