import { createNumberFormatIntlObj } from "./createNumberFormatIntlObj";
import type { Locale } from "../types/locale";

/** @internal */
export function getSeparator(value: number, separatorType: Intl.NumberFormatPartTypes, options?: Intl.NumberFormatOptions, locale?: Locale): string {
  return createNumberFormatIntlObj(locale, options)
    .formatToParts(value)
    .find(part => part.type === separatorType)?.value ?? "";
}