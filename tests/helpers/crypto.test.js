const crypto = require("../../helpers/crypto");

describe("crypto", () => {
  test("error when => key param is missing ", () => {
    expect(() => crypto.hash()).toThrow("key param is missing");
  });

  test("error when => invalid param datatype , key param should only string ", () => {
    expect(() => crypto.hash([] || {})).toThrow(
      "invalid param datatype , key param should only string"
    );
  });

  test("success key hashed", () => {
    expect(crypto.hash("hello world")).toBeDefined();
  });

  test("valid sha265 hash key ", () => {
    expect(String(crypto.hash("hello world")).length).toBe(64);
  });
});
