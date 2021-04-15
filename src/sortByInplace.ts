import { compareNumbersAlike } from "./compareNumbersAlike";
import { compareStrings } from "./compareStrings";
import { resolveCollatorLocale } from "./internal/resolveCollatorLocale";
import { compareNotDefinedTypes } from "./internal/compareNotDefinedTypes";
import { LocaleOrCollator } from "./types/locale";
import { SortSelector } from "./types/sortSelector";
import { SortOrder } from "./types/sortOrder";

export function sortByInplace<T>(source: T[], selector: SortSelector<T>, order?: SortOrder, locale?: LocaleOrCollator): T[]
export function sortByInplace<T>(source: T[], selectors: SortSelector<T>[], order?: SortOrder | SortOrder[], locale?: LocaleOrCollator): T[]
export function sortByInplace<T>(source: T[], selectors: SortSelector<T> | SortSelector<T>[], orders?: SortOrder | SortOrder[], locale?: LocaleOrCollator): T[] {
  const valueSelectors = Array.isArray(selectors) 
    ? selectors 
    : [selectors];

  const sortOrders = (orders !== undefined && !Array.isArray(orders))
    ? Array(valueSelectors.length).fill(orders)
    : orders;

  const collator = resolveCollatorLocale(locale);

  return source.sort(function(a, b) {
    for (let i = 0; i < valueSelectors.length; i++) {
      const selector = valueSelectors[i],
        sortValue = compareValues(a, b, selector, collator);

      if (sortValue !== 0) {
        const order = sortOrders?.[i];

        return (order === "desc" || order === "descend")
          ? -sortValue
          : sortValue;
      }
    }

    return 0;
  });

  function compareValues<T>(
    a: T, 
    b: T, 
    selector: SortSelector<T>, 
    collator: Intl.Collator): number {
    const aValue = selector(a),
      bValue = selector(b),
      typeofSource = aValue ?? bValue;

    if (typeofSource == null) {
      return compareNotDefinedTypes(a, b)!;
    }
    
    if (typeof typeofSource === "string") {
      return compareStrings(aValue as string, bValue as string, collator);
    }

    return compareNumbersAlike(aValue as number, bValue as number);
  }
}