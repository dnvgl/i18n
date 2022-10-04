import { getCurrencySymbol } from "../src";

describe('getCurrencySymbol', () => {
  test.each([
    ["USD", "en", "$"],
    [840, "en", "$"],
    ["PLN", "pl", "zł"],
    ["PLN", "en", "PLN"],
    [985, "pl", "zł"],
    [985, "en", "PLN"]
  ])('returns proper value for %p currency and %p locale', (currency, locale, expected) => {
    for (var i =0; i < 1000; i++) {
      getCurrencySymbol(currency, locale);
    }
    const result = getCurrencySymbol(currency, locale);
    expect(result).toBe(expected);
  });
});