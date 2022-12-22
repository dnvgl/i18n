import { convertToDate } from "./internal/convertToDate";
import { iso4217Currencies } from "./internal/iso4217Currencies";
import { DateIsoString } from "./types/dateIsoString";
import { Iso4217Currency } from "./types/iso4217";

const _cache: Record<string, Iso4217Currency[]> = {};

export function getIso4217Currencies(statusForTheDay?: Date | DateIsoString): Iso4217Currency[] {
  const limit = statusForTheDay ? convertToDate(statusForTheDay) : new Date(),
    year = limit.getFullYear(),
    month = limit.getMonth() + 1,
    day = limit.getDate();

  const dateKey = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const cachedResult = _cache[dateKey];

  if (cachedResult) {
    return cachedResult;
  }

  const list = iso4217Currencies.filter(x => (!x.historicalFrom || x.historicalFrom > dateKey) 
    && (!x.introducedIn || x.introducedIn <= dateKey));

  _cache[dateKey] = list;

  return list;
}