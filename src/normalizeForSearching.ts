import type { Locale } from "./types/locale.js";

// HINT: letters with a stroke/ligatures have no NFD decomposition, so the diacritics removal does not cover them
const nonDecomposableLetters: Record<string, string> = {
  "ł": "l",
  "đ": "d",
  "ø": "o",
  "ħ": "h",
  "ı": "i",
  "æ": "ae",
  "œ": "oe",
  "ß": "ss"
};

export function normalizeForSearching(value: string, locale?: Locale): string {
  return value
    .trim() // HINT: "   Święto  123 " -> "Święto  123"
    .replace(/\s\s+/g, ' ') // HINT: "Święto  123" -> "Święto 123"
    .toLocaleLowerCase(locale) // HINT: "Święto 123" -> "święto 123"
    .normalize("NFD") // HINT: "święto 123" -> "s\u0303wie\u0304to 123" (ś and ę are splitted into two characters, \u0303 and \u0304 are just for an example)
    .replace(/[\u0300-\u036f]/g, "") // HINT: "s\u0303wie\u0304to 123" -> "swieto 123"
    .replace(/[łđøħıæœß]/g, x => nonDecomposableLetters[x]!); // HINT: "łódź" -> "lodz"
}