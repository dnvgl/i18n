import { isCharAtoZUppercase } from "./isCharAtoZUppercase";
import { isCharDigit } from "./isCharDigit";

/** @internal */
export function isValidIbanStructure(iban: string): boolean {
  const length = iban.length;

  if (length > 34 || length < 15) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    const character = iban.charCodeAt(i);

    if ((i < 2 || i > 3) && isCharAtoZUppercase(character)) {
      continue;
    }

    if (i > 1 && isCharDigit(character)) {
      continue;
    }

    return false;
  }

  return true;
}