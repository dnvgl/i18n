import { DateIsoString } from "./types/dateIsoString";

export function formatDateToISO(value: Date | DateIsoString, includeTime: boolean = false): DateIsoString {
  const isoString = (value instanceof Date ? value : new Date(value)).toISOString();
  return includeTime ? isoString : isoString.substr(0, isoString.indexOf('T'))
}