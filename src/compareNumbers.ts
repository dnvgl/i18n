import { compareNumbersAlike } from "./compareNumbersAlike.js";
import type { OptionalType } from "./types/optionalType.js";

export function compareNumbers(a: OptionalType<number>, b: OptionalType<number>): number {
  return compareNumbersAlike(a, b);
}