import { formatCountry } from "../src";
import { iso3166Countries } from "../src/internal/iso3166Countries";

describe('formatCountry', () => {
  test.each([
    ["PL", "pl", "Polska"],
    ["PL", "en", "Poland"],
    ["MHL", "pl", "Wyspy Marshalla"],
    ["MHL", "en", "Marshall Islands"],
    ["MH", "en", "Marshall Islands"],
    [584, "en", "Marshall Islands"],
    ["x", "en", "x"],
    ["xx", "en", "xx"],
    ["xxx", "en", "xxx"],
    ["xxxx", "en", "xxxx"],
    ["__", "en", "__"],
    ["___", "en", "___"],
    [1000, "en", ""],
    [-1, "en", ""],
    ["", "en", ""],
  ])('formats %p using %p locale', (value, locale, expected) => {
    const result = formatCountry(value, locale);
    expect(result).toBe(expected);
  });

  test('all ISO3166 countries are handled by Intl', () => {
    expect(iso3166Countries.every(x => formatCountry(x.alpha2Code, "en").length > 0)).toBeTruthy();
  });
});