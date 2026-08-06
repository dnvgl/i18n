import { convertToDate } from "./internal/convertToDate.js";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj.js";
import { resolveDateTimePartOptions } from "./internal/resolveDateTimePartOptions.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import type { DatePart } from "./types/datePart.js";
import type { Locale } from "./types/locale.js";

export function formatDatePart(value: Date | DateIsoString, part: DatePart, locale?: Locale): string {
  return createDateFormatIntlObj(locale, resolveDateTimePartOptions(part)).format(convertToDate(value));
}