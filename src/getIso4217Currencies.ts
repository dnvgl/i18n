import { iso4217Currencies } from "./internal/iso4217Currencies.js";
import { toDateKey } from "./internal/toDateKey.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import type { Iso4217Currency } from "./types/iso4217.js";

const _cache: Record<string, Iso4217Currency[]> = {};

export function getIso4217Currencies(statusForTheDay?: Date | DateIsoString): Iso4217Currency[] {
  const dateKey = toDateKey(statusForTheDay);
  const cachedResult = _cache[dateKey];

  // HINT: intentionally a stable shared reference per day (e.g. React memoization), do not return a copy; callers must not mutate it
  if (cachedResult) {
    return cachedResult;
  }

  const list = iso4217Currencies.filter(x => (!x.historicalFrom || x.historicalFrom > dateKey) 
    && (!x.introducedIn || x.introducedIn <= dateKey));

  _cache[dateKey] = list;

  return list;
}