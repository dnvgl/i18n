import { createNumberFormat } from "./createNumberFormat";
import { Locale } from "../types/locale";

/** @internal */
export function getSeparator(value: number, separatorType: Intl.NumberFormatPartTypes, options?: Intl.NumberFormatOptions, locale?: Locale): string {
  return createNumberFormat(locale, options)
    .formatToParts(value)
    .find(part => part.type === separatorType)?.value ?? "";
}