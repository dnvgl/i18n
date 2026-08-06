import { createCollator } from "./createCollator.js";
import type { LocaleOrCollator } from "../types/locale.js";

/** @internal */
export function resolveCollatorLocale(source?: LocaleOrCollator): Intl.Collator {
  return !source 
    ? createCollator() 
    : source instanceof Intl.Collator
      ? source
      : createCollator(source);
}
