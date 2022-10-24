import { getDecimalSeparator } from "../src";

describe('getDecimalSeparator', () => {
  test.each([
    ["en", "."],
    ["en-GB", "."],
    ["de", ","],
    ["pl", ","],
    ["zh", "."],
  ])('returns proper value for %p locale', (locale, expected) => {
    const result = getDecimalSeparator(locale);
    expect(result).toBe(expected);
  });
});