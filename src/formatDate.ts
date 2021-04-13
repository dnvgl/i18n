import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions";
import { createDateFormat } from "./internal/createDateFormat";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { DateFormatPrecision } from "./types/dateFormatPrecision";

export function formatDate(value: Date | DateIsoString, dateFormatType: DateFormatPrecision = "days", locale?: Locale): string {
  if (typeof value === 'string') {
    value = new Date(value);
  }

  return createDateFormat(locale, resolveDateTimeFormatOptions(dateFormatType)).format(value);
}