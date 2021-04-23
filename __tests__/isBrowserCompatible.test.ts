import { isBrowserCompatible } from "../src";

describe('isBrowserCompatible', () => {
  test('node supports the library', () => {
    expect(isBrowserCompatible()).toBeTruthy();
  });
});