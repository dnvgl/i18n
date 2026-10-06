import { getDecimalSeparator } from "./getDecimalSeparator.js";
import { getMinusSign } from "./getMinusSign.js";
import { getThousandsSeparator } from "./getThousandsSeparator.js";
import { replaceAll } from "./internal/replaceAll.js";
import type { Locale } from "./types/locale.js";

// HINT: Number() also accepts hex/binary/octal literals (0x10, 0b101, 0o17)
const decimalNumberPattern = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

export function parseNumber(value: string, strictMode: boolean = false, locale?: Locale): number | undefined {
  const decimalSeparator = getDecimalSeparator(locale),
    thousandsSeparator = getThousandsSeparator(locale),
    minusSignSeparator = getMinusSign(locale);
    
  // HINT: \s also covers no-break spaces (U+00A0, U+202F) used as thousands separators or pasted from other apps
  const preParsedValue = replaceAll(value, thousandsSeparator, "")
    .replace(/\s/g, "")
    .replace(decimalSeparator, '.')
    .replace(minusSignSeparator, "-");

  if (strictMode && !decimalNumberPattern.test(preParsedValue)) return undefined;
  const parsedNumber = (strictMode ? Number : parseFloat)(preParsedValue);
  
  return !Number.isFinite(parsedNumber)
    ? undefined 
    : (parsedNumber || 0 /* HINT: -0 case */);
}

