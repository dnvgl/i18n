export function roundUsingBankersMethod(value: number, precision: number): number {
  if (precision === Number.POSITIVE_INFINITY) {
    return value;
  }

  if (isNaN(precision) || precision < 0) {
    throw new RangeError("precision value is out of range.");
  }

  // HINT: intentionally the same as .NET Math.Round(double, digits, MidpointRounding.ToEven), e.g. 1.035 (binary 1.03499...) -> 1.03
  const p = Math.pow(10, Math.trunc(precision)),
    x = value * p,
    r = Math.round(x),
    b = Math.abs(x) % 1 === 0.5 
      ? (r % 2 === 0 
        ? r 
        : r - 1)
      : r;

  return b / p;
}