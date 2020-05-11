const rest = require("../../helpers/Restful.helpers");

describe("restfull-helpers -> fails", () => {
  test("type and msg params are required", () => {
    expect(() => rest({})).toThrow("type and msg are required");
  });

  test("msg param are required", () => {
    expect(() => rest({ type: 1, msg: null })).toThrow("msg is required");
  });

  test("type param are required", () => {
    expect(() => rest({ type: null, msg: 404 })).toThrow("type is required");
  });

  test("type param are not valid", () => {
    expect(() => rest({ type: "hello world", msg: 404 })).toThrow(
      "type should be a number"
    );
  });

  test("msg param are not valid", () => {
    expect(() => rest({ type: 1, msg: "hello world" })).toThrow(
      "msg should be a number"
    );
  });

  test("type not in types enum [0,1]", () => {
    expect(() => rest({ type: 2, msg: 404 })).toThrow(
      "type is wrong, not exist"
    );
  });

  test("msg not in types -> errors ", () => {
    expect(() => rest({ type: 0, msg: 1000 })).toThrow("msg is not exist");
  });

  test("msg not in types", () => {
    expect(() => rest({ type: 1, msg: 1000 })).toThrow("msg is not exist");
  });

  // when not erors param
  test("errors param is required", () => {
    expect(() => rest({ type: 0, msg: 404 })()).toThrow(
      "errors param is required"
    );
  });

  test("data param is required", () => {
    expect(() => rest({ type: 1, msg: 302 })()).toThrow(
      "data param is required"
    );
  });
});

describe("restfull-helpers -> success", () => {
  test("error restfull helper -> success", () => {
    const errors = ["title is exist try another"];
    const errorExample = rest({ type: 0, msg: 404 })(errors);
    expect(errorExample).toEqual({
      code: 404,
      message: "resource not found",
      error: errors,
    });
  });

  test("success restul helper -> success", () => {
    const data = [{ name: "islam" }, { name: "mhmd" }];
    const dataExample = rest({ type: 1, msg: 200 })(data);
    expect(dataExample).toEqual({
      code: 200,
      message: "ok",
      data: data,
    });
  });
});
