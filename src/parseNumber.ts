import { getDecimalSeparator } from "./getDecimalSeparator";
import { getMinusSign } from "./getMinusSign";
import { getThousandsSeparator } from "./getThousandsSeparator";
import { isEmptyOrWhiteSpace } from "./internal/isEmptyOrWhiteSpace";
import { replaceAll } from "./internal/replaceAll";
import { Locale } from "./types/locale";

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

