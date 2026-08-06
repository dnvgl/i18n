import { convertToDate } from "./internal/convertToDate.js";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj.js";
import type { DateIsoString } from "./types/dateIsoString.js";
import type { Locale } from "./types/locale.js";
import type { MonthFormat } from "./types/monthFormat.js";

export function formatMonth(monthIndex: number, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(value: Date | DateIsoString | number, monthFormat: MonthFormat, locale?: Locale): string {
  const date = typeof value === "number"
    ? new Date(2020, value, 1)
    : convertToDate(value);

  return createDateFormatIntlObj(locale, { month: monthFormat }).format(date);
}