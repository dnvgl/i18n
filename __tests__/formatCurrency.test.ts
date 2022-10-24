import { formatCurrency } from "../src";
import { iso4217Currencies } from "../src/internal/iso4217Currencies";

describe('formatCurrency', () => {
  test.each([
    ["PLN", "pl", "złoty polski"],
    ["PLN", "en", "Polish Zloty"],
    ["USD", "pl", "dolar amerykański"],
    ["USD", "en", "US Dollar"],
    [840, "en", "US Dollar"],
    ["x", "en", "x"],
    ["xx", "en", "xx"],
    ["xxx", "en", "xxx"],
    ["xxxx", "en", "xxxx"],
    ["__", "en", "__"],
    ["___", "en", "___"],
    ["____", "en", "____"],
    [1000, "en", ""],
    [-1, "en", ""],
    ["", "en", ""],
  ])('formats %p using %p locale', (value, locale, expected) => {
    const result = formatCurrency(value, locale);
    expect(result).toBe(expected);
  });

  test('all ISO4217 currencies are handled by Intl', () => {
    expect(iso4217Currencies.every(x => formatCurrency(x.alpha3Code, "en").length > 0)).toBeTruthy();
  });
});