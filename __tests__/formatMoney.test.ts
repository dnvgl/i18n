import { formatMoney } from "../src";

describe('formatMoney', () => {
  test.each([
    [1.05, 1, "1.0"],
    [1.15, 1, "1.2"],
    [1.25, 1, "1.2"],
    [1.535, 2, "1.54"],
  ])('formats and rounds %p with precision %p', (value, precision, expected) => {
    expect(formatMoney(value, precision, "en")).toEqual(expected);
  });
});