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

  test('finds new currency for Croatia', () => {
    expect(findIso4217CurrencyForIso3166Country("HRV")).toMatchObject(  {
      alpha3Code: "EUR",
      currencyName: "Euro",
      numericCode: 978,
      minorUnit: 2
    });

    expect(findIso4217CurrencyForIso3166Country("HRV", "2023-01-01")).toMatchObject(  {
      alpha3Code: "EUR",
      currencyName: "Euro",
      numericCode: 978,
      minorUnit: 2
    });
  });

  test('finds old currency for Croatia', () => {
    expect(findIso4217CurrencyForIso3166Country("HRV", "2022-05-05")).toMatchObject(  {
      alpha3Code: "HRK",
      currencyName: "Kuna",
      numericCode: 191,
      minorUnit: 2
    });
  });

  test('finds new currency for Zimbabwe', () => {
    expect(findIso4217CurrencyForIso3166Country("ZWE")).toMatchObject(  {
      alpha3Code: "ZWG",
      currencyName: "Zimbabwe Gold",
      numericCode: 924,
      minorUnit: 2
    });

    expect(findIso4217CurrencyForIso3166Country("ZWE", "2024-09-01")).toMatchObject(  {
      alpha3Code: "ZWG",
      currencyName: "Zimbabwe Gold",
      numericCode: 924,
      minorUnit: 2
    });
  });

  test('finds old currency for Zimbabwe', () => {
    expect(findIso4217CurrencyForIso3166Country("ZWE", "2024-08-31")).toMatchObject(  {
      alpha3Code: "ZWL",
      currencyName: "Zimbabwe Dollar",
      numericCode: 932,
      minorUnit: 2
    });
  });

  test('Map: all countries are covered', () => {
    expect(iso3166CountryToIso4217Currency.size).toEqual(iso3166Countries.length);
  });

  test('Map: all currencies are found', () => {
    iso3166Countries.forEach(country => {
      const resolver = iso3166CountryToIso4217Currency.get(country.alpha3Code);
      
      if (resolver) {
        const currency = findIso4217Currency(typeof resolver === "string" ? resolver : resolver(new Date()));
        expect(currency).toBeDefined();
        if (!!currency?.historicalFrom) {
          // HINT: historical currencies should not be used for the current date
          expect(new Date(currency.historicalFrom).getTime()).toBeGreaterThan(new Date().getTime());
        }
      }
    })
  });
});