import { CurrencySymbolOptions, getCurrencySymbol } from "../src";

describe('getCurrencySymbol', () => {
  test.each([
    ["USD", "en", "$"],
    [840, "en", "$"],
    ["PLN", "pl", "zł"],
    ["PLN", "en", "PLN"],
    [985, "pl", "zł"],
    [985, "en", "PLN"]
  ])('returns proper value for %p currency and %p locale', (currency, locale, expected) => {
    const result = getCurrencySymbol(currency, locale);
    expect(result).toBe(expected);
  });

  test.each([
    [{ currency: "USD" }, "en", "$"],
    [{ currency: "CAD" }, "en", "CA$"],
    [{ currency: "CAD", currencyDisplay: "narrowSymbol" }, "en", "$"],
    [{ currency: 840 }, "en", "$"],
    [{ currency: "PLN" }, "pl", "zł"],
    [{ currency: "PLN" }, "en", "PLN"],
    [{ currency: 985 }, "pl", "zł"],
    [{ currency: 985 }, "en", "PLN"]
  ] as [CurrencySymbolOptions, string, string][])('returns proper value for %p options and %p locale', (currency, locale, expected) => {
    const result = getCurrencySymbol(currency, locale);
    expect(result).toBe(expected);
  });

  describe("given invalid parameters", () => {
    it("fails to compile", () => {
      // @ts-expect-error
      () => getCurrencySymbol({ currencyDisplay: "narrowSymbol" }); // HINT: missing currency argument
      // @ts-expect-error
      () => getCurrencySymbol({ currencyDisplay: "narrowSymbol" }, "en"); // HINT: missing currency argument
    });
  });
});