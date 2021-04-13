export function formatString(format: string, ...values: (string | number)[]): string {
  return format.replace(/{(\d+)}/g, function (match, index) {
    return values[index] !== undefined
      ? `${values[index]}`
      : match;
  });
}