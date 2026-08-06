import { getDecimalSeparator } from "./getDecimalSeparator.js";
import { getMinusSign } from "./getMinusSign.js";
import { getThousandsSeparator } from "./getThousandsSeparator.js";
import { isEmptyOrWhiteSpace } from "./internal/isEmptyOrWhiteSpace.js";
import { replaceAll } from "./internal/replaceAll.js";
import type { Locale } from "./types/locale.js";

export function parseNumber(value: string, strictMode: boolean = false, locale?: Locale): number | undefined {
  const decimalSeparator = getDecimalSeparator(locale),
    thousandsSeparator = getThousandsSeparator(locale),
    minusSignSeparator = getMinusSign(locale);
    
  const preParsedValue = replaceAll(
    replaceAll(value, thousandsSeparator, ""),
    " ", "")
    .replace(decimalSeparator, '.')
    .replace(minusSignSeparator, "-");

  if (strictMode && isEmptyOrWhiteSpace(preParsedValue)) return undefined;
  const parsedNumber = (strictMode ? Number : parseFloat)(preParsedValue);
  
  return !Number.isFinite(parsedNumber)
    ? undefined 
    : (parsedNumber || 0 /* HINT: -0 case */);
}

