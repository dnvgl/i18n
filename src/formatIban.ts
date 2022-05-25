import { removeWhitespaces } from "./internal/removeWhitespaces";

export function formatIban(iban: string, separator: string = " "): string {
  const withoutEmptyCharacters = removeWhitespaces(iban);

  if (!withoutEmptyCharacters) {
    return "";
  }
  
  return withoutEmptyCharacters.match(/.{1,4}/g)!.join(separator);
}