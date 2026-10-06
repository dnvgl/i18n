import { formatNumber } from "./formatNumber.js";
import { getDecimalSeparator } from "./getDecimalSeparator.js";
import { getMinusSign } from "./getMinusSign.js";
import { headAndTail } from "./internal/headAndTail.js";
import type { Locale } from "./types/locale.js";
import type { TransformationOptions } from "./types/transformationOptions.js";

const nativeMinusSign = "-";

export function transformToInputNumericString(text: string, options?: TransformationOptions, locale?: Locale): string {
  const decimalSeparator = getDecimalSeparator(locale),
    isNativeMinusSignIsUsed = text.includes(nativeMinusSign),
    minusSign = isNativeMinusSignIsUsed ? nativeMinusSign : getMinusSign(locale);
    
  let textWithValidCharactersOnly = text
    .replace(new RegExp(String.raw`[^0-9${decimalSeparator}${minusSign}]`, 'g'), '')
    .replace(new RegExp(String.raw`(?!^)${minusSign}`, 'g'), '') // HINT: only the first minus sign remains
  let signPart = textWithValidCharactersOnly.charAt(0) === minusSign ? minusSign : '';
  textWithValidCharactersOnly = textWithValidCharactersOnly.replace(minusSign, '');
  const numericParts = textWithValidCharactersOnly.split(decimalSeparator);
  
  let integerPart = numericParts[0],
    separatorPart = '',
    fractionalPart: string;
  
  if (numericParts.length > 1) {
    // HINT: leave only one decimal separator
    separatorPart = decimalSeparator;
    const [, tail] = headAndTail(numericParts);
    const tailString = tail.join('');

    fractionalPart = options?.fractionalPart !== undefined
      ? options.fractionalPart === 0
        ? ''
        : tailString.substring(0, options.fractionalPart)
      : tailString;
  }
  else {
    fractionalPart = numericParts[1] ?? '';
  }
  
  if (!integerPart && (fractionalPart || separatorPart)) {
    integerPart = '0'; // HINT: .234 -> 0.234 or . -> 0.
  }

  if (options?.maxAllowedValue !== undefined || options?.minAllowedValue !== undefined) {
    const parsedNumber = parseFloat(`${signPart ? nativeMinusSign : ''}${integerPart}.${fractionalPart}`);

    if (!Number.isNaN(parsedNumber)) {
      const targetValue = (parsedNumber > (options.maxAllowedValue ?? parsedNumber))
        ? options.maxAllowedValue!
        : (parsedNumber < (options.minAllowedValue ?? parsedNumber)) 
          ? options.minAllowedValue!
          : parsedNumber;

      if (parsedNumber !== targetValue) {
        // HINT: "en-US" keeps 0-9 digits and "."; toString() would produce exponential notation (1e-7, 1e+21)
        const parts = formatNumber(Math.abs(targetValue), { thousandsSeparator: false, maxPrecision: 20 }, "en-US").split('.');
        signPart = targetValue < 0 ? minusSign : '';
        integerPart = parts[0];
        fractionalPart = parts[1] ?? '';
        separatorPart = fractionalPart ? decimalSeparator : '';
      }
    }
  }

  if (options?.fractionalPart !== undefined) {
    fractionalPart = fractionalPart.substring(0, options.fractionalPart);

    if (options.fractionalPart === 0) {
      separatorPart = '';
    }
    else if (options?.allowOnlyHalfs === true && fractionalPart !== '5') {
      if (fractionalPart.length === 1) {
        fractionalPart = '';
      }
      else if (fractionalPart.length > 1 && parseInt(fractionalPart.substring(1, fractionalPart.length)) !== 0) {
        fractionalPart = fractionalPart[0] === '5' ? '5' : '';
      }
    }

    if (options.forceFractionalPart === true && fractionalPart.length !== options.fractionalPart && !(integerPart === '' && fractionalPart === '')) {
      fractionalPart = fractionalPart.padEnd(options.fractionalPart, '0');
      separatorPart = decimalSeparator;
    }
  }

  if (options?.negativeAllowed === false) {
    signPart = '';
  }

  return `${signPart}${integerPart}${separatorPart}${fractionalPart}`;
}