import { TimeFormatPrecision } from "../types/timeFormatPrecision";

const minutesFormat: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
const secondsFormat: Intl.DateTimeFormatOptions = { ...minutesFormat, second: 'numeric' };

/** @internal */
export function resolveTimeFormatOptions(precision: TimeFormatPrecision): Intl.DateTimeFormatOptions {
  switch (precision) {
    case "minutes":
    case "m":
      return minutesFormat;
    case "seconds":
    case "s":
      return secondsFormat;
  }
}