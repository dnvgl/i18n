import { getWeekendDaysByRegionInternal } from "./internal/getWeekendDaysByRegionInternal.js";
import { resolveLocaleIntlObj } from "./internal/resolveLocaleIntlObj.js";

export function getWeekendDays(locale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale): number[] {
  const localeInstance = resolveLocaleIntlObj(locale);

  if (typeof localeInstance.getWeekInfo !== "undefined") {
    // HINT: native solution; old browsers or node versions may not support this
    return localeInstance.getWeekInfo().weekend;
  }

  // HINT: the weekend depends solely on the region; maximize to resolve it from language/script
  const region = localeInstance.maximize().region;

  // HINT: region can be undefined for tags without a likely region (e.g. tlh, zxx, mul) -> default weekend
  return getWeekendDaysByRegionInternal(region ?? "");
}