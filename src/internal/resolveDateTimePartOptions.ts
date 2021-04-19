import { DatePart } from "../types/datePart";

const yearFormat: Intl.DateTimeFormatOptions = { year: 'numeric' },
  monthFormat: Intl.DateTimeFormatOptions = { month: 'numeric' },
  dayFormat: Intl.DateTimeFormatOptions = { day: 'numeric' },
  hourFormat: Intl.DateTimeFormatOptions = { hour: 'numeric' },
  minuteFormat: Intl.DateTimeFormatOptions = { minute: 'numeric' },
  secondFormat: Intl.DateTimeFormatOptions = { second: 'numeric' };

/** @internal */
export function resolveDateTimePartOptions(precision: DatePart): Intl.DateTimeFormatOptions {
  switch (precision) {
    case "year":
    case "y":
      return yearFormat;
    case "month":
    case "M":
      return monthFormat;
    case "day":
    case "d":
      return dayFormat;
    case "hour":
    case "h":
      return hourFormat;
    case "minute":
    case "m":
      return minuteFormat;
    case "second":
    case "s":
      return secondFormat;
  }
}