import { sortByInplace } from "./sortByInplace.js";
import type { LocaleOrCollator } from "./types/locale.js";
import type { SortOrder } from "./types/sortOrder.js";
import type { SortSelector } from "./types/sortSelector.js";

export function sortBy<T>(source: T[], selector: SortSelector<T>, order?: SortOrder, locale?: LocaleOrCollator): T[]
export function sortBy<T>(source: T[], selectors: SortSelector<T>[], order?: SortOrder | SortOrder[], locale?: LocaleOrCollator): T[]
export function sortBy<T>(source: T[], selector: any, order?: any, locale?: LocaleOrCollator): T[] {
  return sortByInplace<T>([...source], selector, order, locale);
}