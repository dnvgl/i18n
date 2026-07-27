import { convertToDate } from "./internal/convertToDate";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { resolveDateTimePartOptions } from "./internal/resolveDateTimePartOptions";
import type { DateIsoString } from "./types/dateIsoString";
import type { DatePart } from "./types/datePart";
import type { Locale } from "./types/locale";

export function formatDatePart(value: Date | DateIsoString, part: DatePart, locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimePartOptions(part)).format(convertToDate(value));
}