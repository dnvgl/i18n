import { compareNumbersAlike } from "./compareNumbersAlike";
import { OptionalType } from "./types/optionalType";
import { DateIsoString } from "./types/dateIsoString";
import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes";

export function compareDates(a: OptionalType<DateIsoString>, b: OptionalType<DateIsoString>): number;
export function compareDates(a: OptionalType<Date>, b: OptionalType<Date>): number;
export function compareDates(a: OptionalType<DateIsoString | Date>, b: OptionalType<DateIsoString | Date>): number {
  const typeofSource = a ?? b;

  if (typeofSource == null) {
    return compareNotDefinedTypes(a, b)!;
  }
  
  if (typeof typeofSource === "string") {
    a = new Date(a!);
    b = new Date(b!);
  }

  return compareNumbersAlike(a as Date, b as Date);
}