import { compareNumbersAlike } from "./compareNumbersAlike";
import type { OptionalType } from "./types/optionalType";

export function compareBooleans(a: OptionalType<boolean>, b: OptionalType<boolean>): number {
  return compareNumbersAlike(a, b);
}