import { compareNumbersAlike } from "./compareNumbersAlike.js";
import type { OptionalType } from "./types/optionalType.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes.js";
import { convertToDate } from "./internal/convertToDate.js";

export function compareDates(a: OptionalType<DateIsoString>, b: OptionalType<DateIsoString>): number;
export function compareDates(a: OptionalType<Date>, b: OptionalType<Date>): number;
export function compareDates(a: OptionalType<DateIsoString | Date>, b: OptionalType<DateIsoString | Date>): number {
  const notDefinedComparisonResult = compareNotDefinedTypes(a, b);
  
  if (notDefinedComparisonResult !== undefined) {
    return notDefinedComparisonResult;
  }

  return compareNumbersAlike(convertToDate(a!), convertToDate(b!));
}