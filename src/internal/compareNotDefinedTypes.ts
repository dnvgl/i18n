/** @internal */
export function compareNotDefinedTypes(a: unknown, b: unknown): number | undefined {
  if (a === undefined) {
    if (b === undefined) return 0;
    if (b === null) return -1;
    return -1;
  }

  if (a === null) {
    if (b === null) return 0;
    if (b === undefined) return 1;
    return -1;
  }

  if (b == null) return 1;
  
  return undefined;
}