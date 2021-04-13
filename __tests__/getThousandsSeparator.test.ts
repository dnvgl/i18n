import { getThousandsSeparator } from "../src";

const IntlWhitespace = String.fromCharCode(160);

describe('getThousandsSeparator', () => {
  test.each([
    ["en", ","],
    ["en-GB", ","],
    ["de", "."],
    ["pl-PL", IntlWhitespace],
    ["fr-CA", IntlWhitespace],
    ["zh", ","],
  ])('returns proper value for %p locale', (locale, expected) => {
    const result = getThousandsSeparator(locale);
    expect(result).toBe(expected);
  });
});