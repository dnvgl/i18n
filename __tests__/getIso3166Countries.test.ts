import { getIso3166Countries } from "../src";

describe('getIso3166Countries', () => {
  test('check the list', () => {
    const countries = getIso3166Countries();
    expect(countries).toHaveLength(249);
    expect(countries.every(x => x.alpha2Code.length === 2 && x.alpha2Code.toUpperCase() === x.alpha2Code)).toBeTruthy();
    expect(countries.every(x => x.alpha3Code.length === 3 && x.alpha3Code.toUpperCase() === x.alpha3Code)).toBeTruthy();
    expect(countries.every(x => x.countryName.length > 0)).toBeTruthy();
    expect(countries.every(x => x.officialStateName.length > 0)).toBeTruthy();
    expect(countries.every(x => typeof x.numericCode === "number")).toBeTruthy();
  });
});