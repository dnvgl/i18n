import { DateFormatPrecision } from "../types/dateFormatPrecision";

const yearFormat: Intl.DateTimeFormatOptions = { year: 'numeric' },
  monthFormat: Intl.DateTimeFormatOptions = { ...yearFormat, month: 'numeric' },
  dayFormat: Intl.DateTimeFormatOptions = { ...monthFormat, day: 'numeric' },
  minuteFormat: Intl.DateTimeFormatOptions = { ...dayFormat, hour: 'numeric', minute: 'numeric' },
  secondFormat: Intl.DateTimeFormatOptions = { ...minuteFormat, second: 'numeric' };

/** @internal */
export function resolveDateTimeFormatOptions(precision: DateFormatPrecision): Intl.DateTimeFormatOptions {
  switch (precision) {
    case "years":
    case "y":
      return yearFormat;
    case "months":
    case "M":
      return monthFormat;
    case "days":
    case "d":
      return dayFormat;
    case "minutes":
    case "m":
      return minuteFormat;
    case "seconds":
    case "s":
      return secondFormat;
  }
}