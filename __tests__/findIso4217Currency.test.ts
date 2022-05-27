import { findIso4217Currency } from "../src";

describe('findIso4217Currency', () => {
  test.each([
    ["PLN"],
    [985],
  ])('finds currency by %p code', (code) => {
    expect(findIso4217Currency(code)).toMatchObject({
      alpha3Code: "PLN",
      currencyName: "Zloty",
      numericCode: 985,
      minorUnit: 2
    });
  });

  test.each([
    ["PLX"],
    ["xxx"], // HINT: XXX is a valid currency, but must be uppercase
    ["P"],
    [-1],
  ])('does not find currency by %p code', (code) => {
    expect(findIso4217Currency(code)).toBeUndefined();
  });
});