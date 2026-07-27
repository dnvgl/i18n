import { compareNumbersAlike } from "./compareNumbersAlike";
import type { OptionalType } from "./types/optionalType";

export function compareNumbers(a: OptionalType<number>, b: OptionalType<number>): number {
  return compareNumbersAlike(a, b);
}