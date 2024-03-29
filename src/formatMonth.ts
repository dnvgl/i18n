import { convertToDate } from "./internal/convertToDate";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { MonthFormat } from "./types/monthFormat";

export function formatMonth(monthIndex: number, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(value: Date | DateIsoString | number, monthFormat: MonthFormat, locale?: Locale): string {
  const date = typeof value === "number"
    ? new Date(2020, value, 1)
    : convertToDate(value);

  return createDateFormatIntlObj(locale, { month: monthFormat }).format(date);
}