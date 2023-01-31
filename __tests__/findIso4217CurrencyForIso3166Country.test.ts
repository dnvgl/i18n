import { findIso4217Currency, findIso4217CurrencyForIso3166Country } from "../src";
import { iso3166Countries } from "../src/internal/iso3166Countries";
import { iso3166CountryToIso4217Currency } from "../src/internal/iso3166CountryToIso4217Currency";

describe('findIso4217CurrencyForIso3166Country.', () => {
  test.each([
    ["PL"],
    ["POL"],
    [616],
  ])('finds currency by %p code', (code) => {
    expect(findIso4217CurrencyForIso3166Country(code)).toMatchObject(  {
      alpha3Code: "PLN",
      currencyName: "Zloty",
      numericCode: 985,
      minorUnit: 2
    });
  });

  test.each([
    ["PLX"],
    ["P"],
    [-1],
  ])('does not find currency by %p code', (code) => {
    expect(findIso4217CurrencyForIso3166Country(code)).toBeUndefined();
  });

  test('Map: all countries are covered', () => {
    expect(iso3166CountryToIso4217Currency.size).toEqual(iso3166Countries.length);
  });

  test('Map: all currencies are found', () => {
    iso3166Countries.forEach(country => {
      const currencyCode = iso3166CountryToIso4217Currency.get(country.alpha3Code);
      
      if (currencyCode) {
        const currency = findIso4217Currency(currencyCode);
        expect(currency).toBeDefined();
        expect(currency?.historicalFrom).toBeUndefined();
      }
    })
  });
});