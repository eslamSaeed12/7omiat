const dotenv = require("../../helpers/dotenv");

describe("dotenv errors", () => {
  test("dotenv no key exception", () => {
    expect(() => dotenv()).toThrow("key param is missing !");
  });

  test("dotenv no key exception", () => {
    expect(() => dotenv()).toThrow("key param is missing !");
  });

  test("dotenv key string invalid", () => {
    expect(() => dotenv([] || {})).toThrow("key param should only string");
  });

  test("dotenv key not exist", () => {
    expect(() => dotenv("not valid key")).toThrow("key not exist");
  });
  
});
