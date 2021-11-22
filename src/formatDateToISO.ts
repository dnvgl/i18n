import { convertToDate } from "./internal/convertToDate";
import { DateIsoString } from "./types/dateIsoString";

export function formatDateToISO(value: Date | DateIsoString, includeTime: boolean = false): DateIsoString {
  const isoString = convertToDate(value).toISOString();
  return includeTime ? isoString : isoString.substring(0, isoString.indexOf('T'))
}