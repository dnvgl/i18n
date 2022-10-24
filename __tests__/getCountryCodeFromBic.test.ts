import { getCountryCodeFromBic } from "../src";

describe('getCountryCodeFromBic', () => {
  test.each([
    ["BNPAFRPP", "FR"],
    ["BNPAFRPP", "FR"],
    ["MIDLGB22", "GB"],
    ["XXXXXK22", "XK"],
    ["CHASUS33", "US"],
    ["CHASUS33XXX", "US"],
    ["", undefined],
    ["BNPAFR", undefined],
    ["CHA1US33", undefined],
    ["CHASUS33*12", undefined],
    ["CHASUS33  ", undefined],
    ["BNPAF", undefined],
    ["CHASXX33  ", undefined],
    [" CHASUS33", undefined],
    ["  CHASUS33", undefined],
    ["CHASus33", undefined],
    ["CHASUs33", undefined],
    ["CHASuS33", undefined],
    ["CHAS3S33", undefined],
    ["CHASU133", undefined],
    ["CHAS3133", undefined],
    ["CHAS__33", undefined],
  ])('gets code from %p, allowInvalidBicStructure = %p', (value, expected) => {
    const result = getCountryCodeFromBic(value);
    expect(result).toBe(expected);
  });
});