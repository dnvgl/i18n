import { compareNumbersAlike } from "./compareNumbersAlike";
import { OptionalType } from "./types/optionalType";

export function compareNumbers(a: OptionalType<number>, b: OptionalType<number>): number {
  return compareNumbersAlike(a, b);
}