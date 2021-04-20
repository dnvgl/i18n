import { OptionalType } from "./types/optionalType";
import { compareStrings } from "./compareStrings";
import { resolveCollatorLocale } from "./internal/resolveCollatorLocale";
import { LocaleOrCollator } from "./types/locale";

export function compareStringsFactory(locale?: LocaleOrCollator): (a: OptionalType<string>, b: OptionalType<string>) => number {
  const nativeComparer = resolveCollatorLocale(locale);
  
  return (a: OptionalType<string>, b: OptionalType<string>): number => {
    return compareStrings(a, b, nativeComparer);
  };
}