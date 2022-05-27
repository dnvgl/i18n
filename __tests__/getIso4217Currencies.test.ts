import { getIso4217Currencies, Iso4217Currency } from "../src";
import { iso4217Currencies } from "../src/internal/iso4217Currencies";

const isArrayUnique = (arr: any[]) => Array.isArray(arr) 
  && new Set(arr).size === arr.length;

const nameof = <T>(name: keyof T) => name;

describe('getIso4217Currencies', () => {
  test('all properties are properly defined', () => {
    const countries = getIso4217Currencies();
    expect(countries).toHaveLength(181);
    expect(countries.every(x => x.alpha3Code.length === 3 && x.alpha3Code.toUpperCase() === x.alpha3Code)).toBeTruthy();
    expect(countries.every(x => x.currencyName.length > 0)).toBeTruthy();
    expect(countries.every(x => x.minorUnit === null || (typeof x.minorUnit === "number" && x.minorUnit >= 0 && x.minorUnit <= 4 ))).toBeTruthy();
    expect(countries.every(x => typeof x.numericCode === "number" && (x.numericCode > 0 || x.numericCode < 1000))).toBeTruthy();
    expect(countries.every(x => x.isFund === undefined || x.isFund === true)).toBeTruthy();
  });

  test.each([
    [nameof<Iso4217Currency>("alpha3Code")],
    [nameof<Iso4217Currency>("numericCode")],
  ])('no duplicates for property %p', (propName) => {
    expect(isArrayUnique(iso4217Currencies.map(x => x[propName]))).toBeTruthy();
  });
});