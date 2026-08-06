import { compareNumbersAlike } from "./compareNumbersAlike.js";
import type { OptionalType } from "./types/optionalType.js";

export function compareBooleans(a: OptionalType<boolean>, b: OptionalType<boolean>): number {
  return compareNumbersAlike(a, b);
}