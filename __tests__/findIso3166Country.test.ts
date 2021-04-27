import { findIso3166Country } from "../src";

describe('findIso3166Country', () => {
  test.each([
    ["PL"],
    ["POL"],
    [616],
  ])('finds country by %p code', (code) => {
    expect(findIso3166Country(code)).toMatchObject({
      countryName: "Poland",
      officialStateName: "The Republic of Poland",
      alpha2Code: "PL",
      alpha3Code: "POL",
      numericCode: 616
    });
  });

  test.each([
    ["PLX"],
    ["P"],
    [-1],
  ])('does not find country by %p code', (code) => {
    expect(findIso3166Country(code)).toBeUndefined();
  });
});