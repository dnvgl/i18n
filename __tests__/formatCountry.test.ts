import { formatCountry } from "../src";

describe('formatCountry', () => {
  test.each([
    ["PL", "pl", "Polska"],
    ["PL", "en", "Poland"],
    ["MHL", "pl", "Wyspy Marshalla"],
    ["MHL", "en", "Marshall Islands"],
    ["MH", "en", "Marshall Islands"],
    [584, "en", "Marshall Islands"],
    ["xx", "en", "xx"],
    ["", "en", ""],
  ])('formats %p using %p locale', (value, locale, expected) => {
    const result = formatCountry(value, locale);
    expect(result).toBe(expected);
  });
});