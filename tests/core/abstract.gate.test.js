const abstractGate = require("../../app/core/gates/abstract.Gates");

describe("abstract gate fails", () => {
  test("construct gate ", () => {
    expect(() => new abstractGate()).toThrow(
      "Cannot destructure 'undefined' or 'null'."
    );
  });

  test("when the params not functions", () => {
    expect(() => new abstractGate(["sds"])).toThrow(
      "policies should only functions"
    );
  });

  test("define function errors", () => {
    const policies = new abstractGate({
      getTask() {
        return true;
      },
    });
    expect(() => policies.define()).toThrow("policy name is required");
    expect(() => policies.define([])).toThrow("policy name should only string");
  });

  test("define : if no callback function", () => {
    const policies = new abstractGate({
      getTask() {
        return true;
      },
    });
    expect(() => policies.define("getTask", "cb")).toThrow(
      "define policy allows callback to be function"
    );
  });

  test("can with no policyname", () => {
    const policies = new abstractGate({
      getTask() {
        return true;
      },
    });

    expect(() => policies.can(null)).toThrow("policy name is required");
  });

  test("can with not valid policyname", () => {
    const policies = new abstractGate({
      getTask() {
        return true;
      },
    });

    expect(() => policies.can([])).toThrow("policy name should only string");
  });

  test("can with not exist policy", () => {
    const policies = new abstractGate({
      getTask() {
        return true;
      },
    });
    expect(() => policies.can("getTask")).toBeTruthy();
  });
});
