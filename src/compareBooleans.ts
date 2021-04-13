import { compareNumbersAlike } from "./compareNumbersAlike";
import { OptionalType } from "./types/optionalType";

export function compareBooleans(a: OptionalType<boolean>, b: OptionalType<boolean>): number {
  return compareNumbersAlike(a, b);
}