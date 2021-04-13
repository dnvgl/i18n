/** @internal */
export function headAndTail<T>([head, ...tail]: T[]): [T, T[]] {
  return [head, tail];
}