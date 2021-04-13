import { formatString } from "../src";

describe('formatString', () => {
  it('creates string with params', () => {
    const result = formatString("some test {0} a {0} {1} {3} {2}", 1, "test", 5, 100);
    expect(result).toBe("some test 1 a 1 test 100 5");
  });

  it('handles missing params', () => {
    const result = formatString("some test {0} a {1}");
    expect(result).toBe("some test {0} a {1}");
  });
});