import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions";
import { createDateFormat } from "./internal/createDateFormat";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { DateFormatPrecision } from "./types/dateFormatPrecision";
import { convertToDate } from "./internal/convertToDate";

export function formatDate(value: Date | DateIsoString, dateFormatType: DateFormatPrecision = "days", locale?: Locale): string {
  return createDateFormat(locale, resolveDateTimeFormatOptions(dateFormatType)).format(convertToDate(value));
}