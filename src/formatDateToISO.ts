import { convertToDate } from "./internal/convertToDate.js";
import { convertToLocalDate } from "./internal/convertToLocalDate.js";
import { toDateKey } from "./internal/toDateKey.js";
import type { DateIsoString } from "./types/dateIsoString.js";

export function formatDateToISO(value: Date | DateIsoString, includeTime: boolean = false): DateIsoString {
  if (includeTime) {
    return convertToDate(value).toISOString();
  }

  const date = convertToLocalDate(value);

  if (isNaN(date.getTime())) {
    throw new RangeError("Invalid time value");
  }

  // HINT: local calendar day (same as formatDate); toISOString() would give the UTC day, e.g. the previous day for local midnight in UTC+ timezones
  return toDateKey(date);
}