/** @internal */
export function isInRange(value: number, start: number, end: number, includeStart: boolean, includeEnd: boolean): boolean {
  return (includeStart ? value >= start : value > start) && (includeEnd ? value <= end : value < end)
}