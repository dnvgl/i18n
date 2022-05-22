export function roundUsingHalfAwayFromZero(value: number, precision: number): number {
  if (precision === Number.POSITIVE_INFINITY) {
    return value;
  }

  if (precision < 0 || precision >= 16 || isNaN(precision) || precision === -Number.NEGATIVE_INFINITY) {
    throw new RangeError("precision value is out of range.");
  }

  const negativeNumber = value < 0;
  
  if (negativeNumber) {
    value = Math.abs(value);
  }

  const power = 10**Math.trunc(precision),
    // HINT: toPrecision(15) removes floating point rounding errors (Number.EPSILON precision)
    result = Math.round((value * power).toPrecision(15) as any) / power;

  return negativeNumber ? -result : result;
}