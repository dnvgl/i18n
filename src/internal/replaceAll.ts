import { escapeRegExp } from "./escapeRegExp.js";

/** @internal */
export function replaceAll(value: string, searchValue: string, replaceValue: string): string {
  // HINT: natvie .replaceAll() could be used (node v15 required)
  return value.replace(new RegExp(escapeRegExp(searchValue), 'g'), replaceValue); 
}