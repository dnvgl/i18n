import { formatMoney } from "../src";

const IntlWhitespace = String.fromCharCode(160);

describe('formatMoney', () => {
  test.each([
    [1.05, 1, "1.0"],
    [1.15, 1, "1.2"],
    [1.25, 1, "1.2"],
    [1.535, 2, "1.54"],
  ])('formats and rounds %p with precision %p', (value, precision, expected) => {
    expect(formatMoney(value, precision, "en")).toEqual(expected);
  });

  test("default options", () => {
    expect(formatMoney(1.53518, undefined, "en")).toEqual("1.54");
  });

  test("using options", () => {
    expect(formatMoney(1.532, { precision: 2, currency: "PLN" }, "pl-PL")).toEqual(`1,53${IntlWhitespace}zł`);
    expect(formatMoney(1.532, { precision: 2, currency: "USD" }, "pl-PL")).toEqual(`1,53${IntlWhitespace}USD`);
    expect(formatMoney(1.53588, { precision: 3, currency: "USD" }, "en")).toEqual("$1.536");
    expect(formatMoney(1.53588, { precision: 3, currency: "USD", currencyDisplay: "code" }, "en")).toEqual(`USD${IntlWhitespace}1.536`);
  });

  test("using partial options", () => {
    expect(formatMoney(1.53588, { }, "en")).toEqual("1.54");
    expect(formatMoney(1.53588, { precision: 3 }, "en")).toEqual("1.536");
    expect(formatMoney(1.53588, { currency: "USD" }, "en")).toEqual("$1.54");
    expect(formatMoney(1.53588, { currency: "USD", currencyDisplay: "code" }, "en")).toEqual(`USD${IntlWhitespace}1.54`);
  });
});
