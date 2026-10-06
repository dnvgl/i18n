import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions.js";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import type { Locale } from "./types/locale.js";
import type { DateFormatPrecision } from "./types/dateFormatPrecision.js";
import { convertToLocalDate } from "./internal/convertToLocalDate.js";

export function formatDate(value: Date | DateIsoString, dateFormatType: DateFormatPrecision = "days", locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimeFormatOptions(dateFormatType)).format(convertToLocalDate(value));
}