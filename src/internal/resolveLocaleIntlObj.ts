import { getSystemLocaleName } from "../getSystemLocaleName";

/** @internal */
export function resolveLocaleIntlObj(locale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale): Intl.Locale {
  return locale == null
    ? new Intl.Locale(getSystemLocaleName())
    : locale instanceof Intl.Locale
      ? locale
      : new Intl.Locale(locale)
}