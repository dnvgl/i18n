import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes.js";
import { resolveCollatorLocale } from "./internal/resolveCollatorLocale.js";
import type { LocaleOrCollator } from "./types/locale.js";
import type { OptionalType } from "./types/optionalType.js";

export function compareStrings(a: OptionalType<string>, b: OptionalType<string>, locale?: LocaleOrCollator): number {
  const notDefinedComparisonResult = compareNotDefinedTypes(a, b);
  
  if (notDefinedComparisonResult !== undefined) {
    return notDefinedComparisonResult;
  }

  return resolveCollatorLocale(locale).compare(a!, b!);
}