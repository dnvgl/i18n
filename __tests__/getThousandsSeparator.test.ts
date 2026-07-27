import { getThousandsSeparator } from "../src";

const noBreakSpace = String.fromCharCode(160);

describe('getThousandsSeparator', () => {
  test.each([
    ["en", ","],
    ["en-GB", ","],
    ["de", "."],
    ["pl-PL", noBreakSpace],
    ["fr-CA", noBreakSpace],
    ["zh", ","],
  ])('returns proper value for %p locale', (locale, expected) => {
    const result = getThousandsSeparator(locale);
    expect(result).toBe(expected);
  });
});