import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import type { DateIsoString } from "./types/dateIsoString";
import type { Locale } from "./types/locale";
import type { DateFormatPrecision } from "./types/dateFormatPrecision";
import { convertToDate } from "./internal/convertToDate";

export function formatDate(value: Date | DateIsoString, dateFormatType: DateFormatPrecision = "days", locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimeFormatOptions(dateFormatType)).format(convertToDate(value));
}