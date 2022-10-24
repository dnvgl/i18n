import { resolveDateTimeFormatOptions } from "./internal/resolveDateTimeFormatOptions";
import { createDateFormatIntlObj } from "./internal/createDateFormatIntlObj";
import { Locale } from "./types/locale";
import { DateFormatPrecision } from "./types/dateFormatPrecision";

const dateForParts = new Date(2020, 5, 5, 5, 5, 5); // HINT: carefully selected date (segments smaller than 10)

export function getDateFnsFormat(precision: DateFormatPrecision = "days", locale?: Locale): string {
  const intlFormat = createDateFormatIntlObj(locale, resolveDateTimeFormatOptions(precision)),
    parts = intlFormat.formatToParts(dateForParts),
    hasDayPeriod = parts.some(x => x.type === "dayPeriod");

  // HINT: date-fns v2 format
  return parts
    .map(x => {
      switch (x.type) {
        case "year": return "yyyy";
        case "month": return x.value.length === 1 ? "M" : "MM";
        case "day": return x.value.length === 1 ? "d" : "dd";
        case "hour": return x.value.length === 1 ? hasDayPeriod ? "h" : "H" : hasDayPeriod ? "hh" : "HH";
        case "minute": return x.value.length === 1 ? "m" : "mm";
        case "second": return x.value.length === 1 ? "s" : "ss";
        case "dayPeriod": return "A";
        case "literal": return `'${x.value}'`; // HINT: escaping
        case "era": return 'G';
        case "timeZoneName": return 'XXX';
        case "weekday": return "EEE";
        default: return ''; // HINT: unexpected type, it's safer to ignore it
      }
    })
    .join('')
    .replace("' '' '", "' '"); // HINT: ignored type can cause duplicated "space" literal
}