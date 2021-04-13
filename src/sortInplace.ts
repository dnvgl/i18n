import { sortByInplace } from "./sortByInplace";
import { LocaleOrCollator } from "./types/locale";
import { OptionalType } from "./types/optionalType";
import { SortOrder } from "./types/sortOrder";

export function sortInplace(source: OptionalType<string>[], order?: SortOrder, locale?: LocaleOrCollator): string[];
export function sortInplace(source: OptionalType<number>[], order?: SortOrder, locale?: LocaleOrCollator): number[];
export function sortInplace(source: OptionalType<Date>[], order?: SortOrder, locale?: LocaleOrCollator): Date[];
export function sortInplace(source: OptionalType<boolean>[], order?: SortOrder, locale?: LocaleOrCollator): boolean[];
export function sortInplace(source: any[], order?: SortOrder, locale?: LocaleOrCollator): any[] {
  // HINT: native .sort() is broken, it ignores undefined value (always at the end)
  let undefinedValuesCounter = 0;

  for (let i = 0; i < source.length; i++){ 
    const element = source[i];

    if (element === undefined) { 
      source.splice(i, 1);
      undefinedValuesCounter++;
      i--; 
    }
  }

  sortByInplace(source, x => x, order, locale);

  if (undefinedValuesCounter) {
    if (order === "desc" || order === "descend") {
      for (let i = 0; i < undefinedValuesCounter; ++i) {
        source.push(undefined);
      }
    }
    else {
      for (let i = 0; i < undefinedValuesCounter; ++i) {
        source.unshift(undefined);
      }
    }
  }

  return source;
}