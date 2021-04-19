import { compareNumbersAlike } from "./compareNumbersAlike";
import { OptionalType } from "./types/optionalType";
import { DateIsoString } from "./types/dateIsoString";
import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes";
import { convertToDate } from "./internal/convertToDate";

export function compareDates(a: OptionalType<DateIsoString>, b: OptionalType<DateIsoString>): number;
export function compareDates(a: OptionalType<Date>, b: OptionalType<Date>): number;
export function compareDates(a: OptionalType<DateIsoString | Date>, b: OptionalType<DateIsoString | Date>): number {
  const notDefinedComparisonResult = compareNotDefinedTypes(a, b);
  
  if (notDefinedComparisonResult !== undefined) {
    return notDefinedComparisonResult;
  }

  return compareNumbersAlike(convertToDate(a!), convertToDate(b!));
}