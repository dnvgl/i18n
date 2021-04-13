/** @internal */
export function isEmptyOrWhiteSpace(value: string): boolean {
  return /^\s*$/.test(value);
}