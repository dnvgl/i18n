import { getIso3166Countries, Iso3166Country } from "../src";
import { iso3166Countries } from "../src/internal/iso3166Countries";

const isArrayUnique = (arr: any[]) => Array.isArray(arr) 
  && new Set(arr).size === arr.length;

const nameof = <T>(name: keyof T) => name;

describe('getIso3166Countries', () => {
  test('all properties are properly defined', () => {
    const countries = getIso3166Countries();
    expect(countries).toHaveLength(249);
    expect(countries.every(x => x.alpha2Code.length === 2 && x.alpha2Code.toUpperCase() === x.alpha2Code)).toBeTruthy();
    expect(countries.every(x => x.alpha3Code.length === 3 && x.alpha3Code.toUpperCase() === x.alpha3Code)).toBeTruthy();
    expect(countries.every(x => x.countryName.length > 0)).toBeTruthy();
    expect(countries.every(x => x.officialStateName.length > 0)).toBeTruthy();
    expect(countries.every(x => typeof x.numericCode === "number" && (x.numericCode > 0 || x.numericCode < 1000))).toBeTruthy();
  });

  test.each([
    [nameof<Iso3166Country>("alpha2Code")],
    [nameof<Iso3166Country>("alpha3Code")],
    [nameof<Iso3166Country>("numericCode")],
    [nameof<Iso3166Country>("officialStateName")],
    [nameof<Iso3166Country>("countryName")],
  ])('no duplicates for property %p', (propName) => {
    expect(isArrayUnique(iso3166Countries.map(x => x[propName]))).toBeTruthy();
  });
});