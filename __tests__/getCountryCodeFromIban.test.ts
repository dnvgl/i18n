import { getCountryCodeFromIban } from "../src";

const nonBreakingSpace = String.fromCharCode(160),
  tab = String.fromCharCode(9);

describe('getCountryCodeFromIban', () => {
  test.each([
    ["BE", undefined],
    ["BE71096123456769", "BE"],
    ["BR1500000000000010932840814P2", "BR"],
    ["CR99000000000000888888", "CR"],
    ["FR7630006000011234567890189", "FR"],
    ["IE12BOFI90000112345678", "IE"],
    ["DE91100000000123456789", "DE"],
    ["GR9608100010000001234567890", "GR"],
    ["MU43BOMM0101123456789101000MUR", "MU"],
    ["PK70BANK0000123456789000", "PK"],
    ["PL10105000997603123456789123", "PL"],
    ["PT50003300005013190122905", "PT"],
    ["RO09BCYP0000001234567890", "RO"],
    ["LC14BOSL123456789012345678901234", "LC"],
    ["SA4420000001234567891234", "SA"],
    ["SK0809000000000123123123", "SK"],
    ["ES7921000813610123456789", "ES"],
    ["SE8730000000010123456789", "SE"],
    ["CH5604835012345678009", "CH"],
    ["GB98MIDL07009312345678", "GB"],
    ["BE 7109 6123 4567 69", undefined],
    ["BEXXXXXXXXX", undefined],
    ["", undefined],
    ["B", undefined],
    ["be", undefined],
    [" BE71096123456769", undefined],
    ["  BE71096123456769", undefined],
    ["BE7109612345p769", undefined],
    ["BEX109612345P769", undefined],
    ["Be71096123456769", undefined],
    ["bE71096123456769", undefined],
    ["__71096123456769", undefined],
    ["b371096123456769", undefined],
    ["1371096123456769", undefined],
  ])('gets code from %p', (value, expected) => {
    const result = getCountryCodeFromIban(value);
    expect(result).toBe(expected);
  });

  test.each([
    ["BE", undefined],
    ["BR15 0000 0000 0000 1093 2840 814 P2", "BR"],
    ["BR15 0000 0000 000010932840 814 P2", "BR"],
    [`BR15${nonBreakingSpace}0000${nonBreakingSpace}0000${nonBreakingSpace}000010932840${nonBreakingSpace}814${nonBreakingSpace}P2`, "BR"],
    [`${tab}MU43 BOMM 0101 1234 5678 9101 000 MUR`, "MU"],
    ["BR1500000000000010932840814P2", "BR"],
  ])('gets code from %p when removing whitespaces', (value, expected) => {
    const result = getCountryCodeFromIban(value, { removeWhitespaces: true });
    expect(result).toBe(expected);
  });

  test.each([
    ["BE", "BE"],
    ["BR15 0000 0000 0000 1093 2840 814 P2", "BR"],
    ["BR1513", "BR"],
    ["BRDGSET#$T#T#$FEFSE$FEGS$$TY##afaf", "BR"],
    ["BR.....", "BR"],
    [`${tab}MU43 BOMM 0101 1234 5678 9101 000 MUR`, undefined],
    ["BR1500000000000010932840814P2", "BR"],
  ])('gets code from %p when ignoring IBAN structure', (value, expected) => {
    const result = getCountryCodeFromIban(value, { validateStructure: false });
    expect(result).toBe(expected);
  });
});