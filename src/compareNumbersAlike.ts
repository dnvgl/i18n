import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes";
import { OptionalType } from "./types/optionalType";

export function compareNumbersAlike(a: OptionalType<number>, b: OptionalType<number>): number;
export function compareNumbersAlike(a: OptionalType<Date>, b: OptionalType<Date>): number;
export function compareNumbersAlike(a: OptionalType<boolean>, b: OptionalType<boolean>): number;
export function compareNumbersAlike(a: OptionalType<number | Date | boolean>, b: OptionalType<number | Date | boolean>): number {
  const notDefinedComparisonResult = compareNotDefinedTypes(a, b);
  
  if (notDefinedComparisonResult !== undefined) {
    return notDefinedComparisonResult;
  }

  if (a === b) return 0;
  if (a! > b!) return 1;
  if (b! > a!) return -1;
  if (isNaN(a as number)) return isNaN(b as number) ? 0 : -1;
  return isNaN(b as number) ? 1 : 0;
}