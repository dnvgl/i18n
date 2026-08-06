import { isBrowserCompatible } from "../src/index.js";

describe('isBrowserCompatible', () => {
  test('node supports the library', () => {
    expect(isBrowserCompatible()).toBeTruthy();
  });
});