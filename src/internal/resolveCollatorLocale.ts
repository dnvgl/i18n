import { createCollator } from "./createCollator";
import { LocaleOrCollator } from "../types/locale";

/** @internal */
export function resolveCollatorLocale(source?: LocaleOrCollator): Intl.Collator {
  return !source 
    ? createCollator() 
    : source instanceof Intl.Collator
      ? source
      : createCollator(source);
}
