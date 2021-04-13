import { createCollator } from "./createCollator";
import { LocaleOrCollator } from "../types/locale";

/** @internal */
export function resolveCollatorLocale(locale?: LocaleOrCollator): Intl.Collator {
  return !locale 
    ? createCollator() 
    : (typeof locale === "string" || Array.isArray(locale))
      ? createCollator(locale)
      : locale;
}