import type { OptionalType } from "./types/optionalType.js";
import { compareStrings } from "./compareStrings.js";
import { resolveCollatorLocale } from "./internal/resolveCollatorLocale.js";
import type { LocaleOrCollator } from "./types/locale.js";

export function compareStringsFactory(locale?: LocaleOrCollator): (a: OptionalType<string>, b: OptionalType<string>) => number {
  const nativeComparer = resolveCollatorLocale(locale);
  
  return (a: OptionalType<string>, b: OptionalType<string>): number => {
    return compareStrings(a, b, nativeComparer);
  };
}