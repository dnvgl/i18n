import type { DateIsoString } from "../types/dateIsoString.js";

/** @internal */
export function toDateKey(value?: Date | DateIsoString): DateIsoString {
  const date = value || new Date();

  // HINT: a date-only string must not be converted to Date (it would be UTC midnight, i.e. the previous day in UTC- timezones)
  return typeof date === "string"
    ? date.substring(0, 10)
    : `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
