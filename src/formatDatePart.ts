import { convertToDate } from "./internal/convertToDate";
import { createDateFormat } from "./internal/createDateFormat";
import { resolveDateTimePartOptions } from "./internal/resolveDateTimePartOptions";
import { DateIsoString } from "./types/dateIsoString";
import { DatePart } from "./types/datePart";
import { Locale } from "./types/locale";

export function formatDatePart(value: Date | DateIsoString, part: DatePart, locale?: Locale): string {
  return createDateFormat(locale, resolveDateTimePartOptions(part)).format(convertToDate(value));
}