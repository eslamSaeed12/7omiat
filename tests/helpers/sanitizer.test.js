const sanitizer = require("../../helpers/sanitizer");
describe("sanitizer errors", () => {
  // str
  test("when => not valid string", () => {
    expect(() => sanitizer.$str(13413)).toThrow("str param should only string");
  });

  test("when => not exist key", () => {
    expect(() => sanitizer.$str()).toThrow("str param is missing !");
  });

  // end str

  // int

  test("when => not exist key", () => {
    expect(() => sanitizer.$int()).toThrow("int param is missing !");
  });

  test("when => not valid int", () => {
    expect(() => sanitizer.$int("سترنق")).toThrow(
      "int param should be valid number"
    );
  });

  // end int

  // float

  test("when => not exist key", () => {
    expect(() => sanitizer.$float()).toThrow("float param is missing !");
  });

  test("when => not valid number", () => {
    expect(() => sanitizer.$float("hello world")).toThrow("not valid number");
  });

  test("when => not valid float", () => {
    expect(() => sanitizer.$float(155)).toThrow("not valid float");
  });

  // end float
});

describe("success operations of sanitizer", () => {
  test("when =>  danger text with script tag", () => {
    expect(sanitizer.$str('<script>alert("test")</script>')).toBe(
      'alert("test")'
    );
  });

  test("success oeperations $int", () => {
    expect(sanitizer.$int(155.5)).toBe(155);
  });

  test("success oeperations $float", () => {
    expect(sanitizer.$float(0.6)).toBeCloseTo(0.6);
  });
});
