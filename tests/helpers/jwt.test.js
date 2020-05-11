const jwt = require("../../helpers/jwt");

const enc = jwt.encode({ id: 314134 }, "secret");

describe("jwt fails", () => {
  test("encode - when no payload", () => {
    expect(() => jwt.encode(null, "")).toThrow("payload is missing");
  });

  test("encode - when payload not object", () => {
    expect(() => jwt.encode([], "secret")).toThrow(
      'Expected "payload" to be a plain object.'
    );
  });

  test("encode - when no secret ", () => {
    expect(() => jwt.encode({}, null)).toThrow("secret key is missing");
  });

  test("encode - when secret not valid string ", () => {
    expect(() => jwt.encode({}, [])).toThrow("secret key only string");
  });

  // decode
  test("decode - when not jwt token", () => {
    expect(() => jwt.decode(null, "")).toThrow("jwt token is missing !");
  });

  test("decode - when not valid jwt token", () => {
    expect(() => jwt.decode([], "")).toThrow("jwt token should only string");
  });

  test("decode - when no secret", () => {
    expect(() => jwt.decode("test", null)).toThrow("secret key is missing");
  });

  test("decode - when secret not valid string", () => {
    expect(() => jwt.decode("test", [])).toThrow("secret key only string");
  });

  test("not valid jwt syntax ", () => {
    expect(() => jwt.decode("notvalidToken", "secret")).toThrow(
      "jwt malformed"
    );
  });

  // not valid secret key

  test("not valid jwt syntax ", () => {
    expect(() => jwt.decode(enc, "notsecret")).toThrow("invalid signature");
  });
});

describe("jwt success operations", () => {
    
  test("jwt encode", () => {
    expect(jwt.encode({ id: "test" }, "secret")).toBeDefined();
  });

  test("jwt decode", () => {
    expect(jwt.decode(enc, "secret").id).toBe(314134);
  });

});
