export type Locale = Intl.BCP47LanguageTag | Intl.BCP47LanguageTag[]; // HINT: https://en.wikipedia.org/wiki/IETF_language_tag
export type LocaleOrCollator = Locale | Intl.Collator;