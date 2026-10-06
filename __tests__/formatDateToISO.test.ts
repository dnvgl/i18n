import { formatDateToISO } from "../src/index.js";

describe('formatDateToISO', () => {
  test.each([
    [new Date(2020, 5, 10, 22, 15, 7), false, "2020-06-10"],
  ])('formats (Date type) %p', (value, includeTime, expected) => {
    expect(formatDateToISO(value, includeTime)).toEqual(expected);
  });

  test.each([
    ["2020-06-10T10:15:07.000Z", false, "2020-06-10"],
  ])('formats (ISO string) %p', (value, includeTime, expected) => {
    expect(formatDateToISO(value, includeTime)).toEqual(expected);
  });
});