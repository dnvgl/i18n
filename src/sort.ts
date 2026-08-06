import { sortInplace } from "./sortInplace.js";
import type { LocaleOrCollator } from "./types/locale.js";
import type { OptionalType } from "./types/optionalType.js";
import type { SortOrder } from "./types/sortOrder.js";

export function sort(source: OptionalType<string>[], order?: SortOrder, locale?: LocaleOrCollator): string[];
export function sort(source: OptionalType<number>[], order?: SortOrder, locale?: LocaleOrCollator): number[];
export function sort(source: OptionalType<Date>[], order?: SortOrder, locale?: LocaleOrCollator): Date[];
export function sort(source: OptionalType<boolean>[], order?: SortOrder, locale?: LocaleOrCollator): boolean[];
export function sort(source: any[], order?: SortOrder, locale?: LocaleOrCollator): any[] {
  return [...sortInplace(source, order, locale)];
}