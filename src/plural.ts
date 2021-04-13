import { isInRange } from "./internal/isInRange";
import { PluralizationLang } from "./types/pluralizationLang";

function germanAlike(n: number): number { 
  return n === 1 ? 0 : 1;
};

function chinese(): number { 
  return 0;
};

function polish(n: number): number {
  if (n === 1) return 0;
  
  return isInRange(n % 10, 2, 4, true, true) && !isInRange(n % 100, 10, 20, true, false)
    ? 1 
    : 2;
};

type Pluralization = (n: number) => number;

function resolvePluralization(lang: PluralizationLang): Pluralization {
  switch (lang) {
    case "en":
    case "de":
    case "no":
    case "es":
      return germanAlike;
    case "pl":
      return polish;
    case "zh":
      return chinese;
    default:
      return germanAlike;
  }
}

export function plural(wordPattern: string[], count: number, lang: PluralizationLang): string;
export function plural(wordPattern: string, count: number, lang: PluralizationLang, separator?: string): string;
export function plural(wordPattern: string | string[], count: number, lang: PluralizationLang, separator: string = "|"): string {
  const wordIndex = resolvePluralization(lang)(count),
    words = Array.isArray(wordPattern) ? wordPattern : wordPattern.split(separator);

  return words[(words.length - 1 < wordIndex) ? 0 : wordIndex] ?? "";
}