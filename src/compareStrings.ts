import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes";
import { resolveCollatorLocale } from "./internal/resolveCollatorLocale";
import { LocaleOrCollator } from "./types/locale";
import { OptionalType } from "./types/optionalType";

export function compareStrings(a: OptionalType<string>, b: OptionalType<string>, locale?: LocaleOrCollator): number {
  const notDefinedComparisonResult = compareNotDefinedTypes(a, b);
  
  if (notDefinedComparisonResult !== undefined) {
    return notDefinedComparisonResult;
  }

  return resolveCollatorLocale(locale).compare(a!, b!);
}