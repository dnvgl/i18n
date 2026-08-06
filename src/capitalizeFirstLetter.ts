import type { Locale } from "./types/locale.js";

export function capitalizeFirstLetter(value: string, locale?: Locale): string {
  return value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);
}