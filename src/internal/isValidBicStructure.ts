import { isCharAtoZUppercase } from "./isCharAtoZUppercase";
import { isCharDigit } from "./isCharDigit";

/** @internal */
export function isValidBicStructure(bic: string): boolean {
  const length = bic.length;

  if (length !== 8 && length !== 11) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    const character = bic.charCodeAt(i);
    
    if (isCharAtoZUppercase(character)) {
      continue;
    }
    
    if (i > 5 && isCharDigit(character)) {
      continue;
    }

    return false;
  }

  return true;
}