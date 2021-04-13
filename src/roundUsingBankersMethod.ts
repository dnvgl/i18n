export function roundUsingBankersMethod(value: number, precision: number): number {
  const p = Math.pow(10, precision),
    x = value * p,
    r = Math.round(x),
    b = Math.abs(x) % 1 === 0.5 
      ? (r % 2 === 0 
        ? r 
        : r - 1)
      : r;

  return b / p;
}