import { convertToDate } from "./internal/convertToDate";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { resolveTimeFormatOptions } from "./internal/resolveTimeFormatOptions";
import { DateIsoString } from "./types/dateIsoString";
import { Locale } from "./types/locale";
import { TimeFormatPrecision } from "./types/timeFormatPrecision";

export function formatTime(time: [number, number, number], timeFormatType?: TimeFormatPrecision, locale?: Locale): string;
export function formatTime(value: Date | DateIsoString, timeFormatType?: TimeFormatPrecision, locale?: Locale): string;
export function formatTime(x: Date | DateIsoString | [number, number, number], timeFormatType: TimeFormatPrecision = "seconds", locale?: Locale): string {
  const date = Array.isArray(x)
    ? new Date(1, 1, 1, x[0] ?? 0, x[1] ?? 0, x[2] ?? 0)
    : convertToDate(x);

  return createDateFormatIntlObj(locale, resolveTimeFormatOptions(timeFormatType)).format(date);
}