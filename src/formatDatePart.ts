import { convertToDate } from "./internal/convertToDate";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { resolveDateTimePartOptions } from "./internal/resolveDateTimePartOptions";
import { DateIsoString } from "./types/dateIsoString";
import { DatePart } from "./types/datePart";
import { Locale } from "./types/locale";

export function formatDatePart(value: Date | DateIsoString, part: DatePart, locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimePartOptions(part)).format(convertToDate(value));
}