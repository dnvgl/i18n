import type { Locale } from "./types/locale.js";

export function lowercaseFirstLetter(value: string, locale?: Locale): string {
  return value.charAt(0).toLocaleLowerCase(locale) + value.slice(1);
}