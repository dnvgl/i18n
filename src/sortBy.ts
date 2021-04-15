import { sortByInplace } from "./sortByInplace";
import { LocaleOrCollator } from "./types/locale";
import { SortOrder } from "./types/sortOrder";
import { SortSelector } from "./types/sortSelector";

export function sortBy<T>(source: T[], selector: SortSelector<T>, order?: SortOrder, locale?: LocaleOrCollator): T[]
export function sortBy<T>(source: T[], selectors: SortSelector<T>[], order?: SortOrder | SortOrder[], locale?: LocaleOrCollator): T[]
export function sortBy<T>(source: T[], selector: any, order?: any, locale?: LocaleOrCollator): T[] {
  return sortByInplace<T>([...source], selector, order, locale);
}