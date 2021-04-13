import { Locale } from "./types/locale";

export function lowercaseFirstLetter(value: string, locale?: Locale): string {
  return value.charAt(0).toLocaleLowerCase(locale) + value.slice(1);
}