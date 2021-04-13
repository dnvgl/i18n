export function formatIban(iban: string, separator: string = " "): string {
  const withoutEmptyCharacters = iban.replace(/\s/g, "");

  if (!withoutEmptyCharacters) {
    return "";
  }
  
  return withoutEmptyCharacters.match(/.{1,4}/g)!.join(separator);
}