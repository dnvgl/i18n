import { getIso4217Currencies } from "../src";
import { iso4217Currencies } from "../src/internal/iso4217Currencies";

const isArrayUnique = (arr: any[]) => Array.isArray(arr) 
  && new Set(arr).size === arr.length;

describe('getIso4217Currencies', () => {
  test('all properties are properly defined', () => {
    const countries = getIso4217Currencies("2022-12-31");
    expect(countries.every(x => x.alpha3Code.length === 3 && x.alpha3Code.toUpperCase() === x.alpha3Code)).toBeTruthy();
    expect(countries.every(x => x.currencyName.length > 0)).toBeTruthy();
    expect(countries.every(x => x.minorUnit === null || (typeof x.minorUnit === "number" && x.minorUnit >= 0 && x.minorUnit <= 4 ))).toBeTruthy();
    expect(countries.every(x => typeof x.numericCode === "number" && (x.numericCode > 0 || x.numericCode < 1000))).toBeTruthy();
    expect(countries.every(x => x.isFund === undefined || x.isFund === true)).toBeTruthy();
    expect(countries.every(x => x.historicalFrom === undefined || x.historicalFrom.length === 10)).toBeTruthy();
    expect(countries.every(x => x.introducedIn === undefined || x.introducedIn.length === 10)).toBeTruthy();
  });

  test('Kuna (HRK) currency is not returned', () => {
    const countries = getIso4217Currencies("2023-01-01");
    expect(countries).toHaveLength(180);
    expect(countries.find(x => x.alpha3Code === "HRK")).toBeUndefined();
  });

  test('Kuna (HRK) currency is returned', () => {
    const countries = getIso4217Currencies("2022-12-31");
    expect(countries).toHaveLength(181);
    expect(countries.find(x => x.alpha3Code === "HRK")).toBeDefined();
  });

  test('Netherlands Antillean Guilder (ANG) currency is returned', () => {
    const countries = getIso4217Currencies("2024-01-01");
    expect(countries).toHaveLength(180);
    expect(countries.find(x => x.alpha3Code === "ANG")).toBeDefined();
  });

  test('Caribbean Guilder (XCG) is returned', () => {
    const countries = getIso4217Currencies("2025-03-31");
    expect(countries).toHaveLength(180);
    expect(countries.find(x => x.alpha3Code === "XCG")).toBeDefined();
    expect(countries.find(x => x.alpha3Code === "ANG")).toBeUndefined();
  });

  test('Zimbabwe Gold (ZWG) currency is not returned', () => {
    const countries = getIso4217Currencies("2024-06-24");
    expect(countries).toHaveLength(180);
    expect(countries.find(x => x.alpha3Code === "ZWG")).toBeUndefined();
  });

  test('Zimbabwe Gold (ZWG) currency is returned', () => {
    const countries = getIso4217Currencies("2024-06-25");
    expect(countries).toHaveLength(181);
    expect(countries.find(x => x.alpha3Code === "ZWG")).toBeDefined();
  });

  test('Zimbabwe Dollar (ZWL) currency is not returned', () => {
    const countries = getIso4217Currencies("2024-09-01");
    expect(countries).toHaveLength(180);
    expect(countries.find(x => x.alpha3Code === "ZWL")).toBeUndefined();
  });

  test('Zimbabwe Dollar (ZWL) currency is returned', () => {
    const countries = getIso4217Currencies("2024-08-31");
    expect(countries).toHaveLength(181);
    expect(countries.find(x => x.alpha3Code === "ZWL")).toBeDefined();
  });

  test('function should return the same reference', () => {
    const countries1 = getIso4217Currencies("2022-12-31");
    const countries2 = getIso4217Currencies("2022-12-31");
    expect(countries1 === countries2).toBeTruthy();
  });

  test('no duplicates for property alpha3Code', () => {
    expect(isArrayUnique(iso4217Currencies.map(x => x.alpha3Code))).toBeTruthy();
  });

  test('no duplicates for property numericCode', () => {
    const currenciesWithoutKnownNumericCodeDuplicates = iso4217Currencies
      .filter(x => x.alpha3Code !== "ANG" && x.alpha3Code !== "XCG");

    expect(isArrayUnique(currenciesWithoutKnownNumericCodeDuplicates.map(x => x.numericCode))).toBeTruthy();
  });
});