import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { DateFormatPrecision } from "./types/dateFormatPrecision";
import { convertToDate } from "./internal/convertToDate";

export function formatDate(value: Date | DateIsoString, dateFormatType: DateFormatPrecision = "days", locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimeFormatOptions(dateFormatType)).format(convertToDate(value));
}