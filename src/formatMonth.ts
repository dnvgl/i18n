import { convertToDate } from "./internal/convertToDate";
import { createDateFormat } from "./internal/createDateFormat";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { MonthFormat } from "./types/monthFormat";

export function formatMonth(month: number, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
export function formatMonth(value: Date | DateIsoString | number, monthFormat: MonthFormat, locale?: Locale): string {
  const date = typeof value === "number"
    ? new Date(2020, value, 1)
    : convertToDate(value);

  return createDateFormat(locale, { month: monthFormat }).format(date);
}