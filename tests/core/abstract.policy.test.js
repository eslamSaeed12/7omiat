const abstractPolicy = require("../../app/core/policies/abstract.policies");

describe("fails", () => {
  test("policy class when no params", () => {
    expect(() => new abstractPolicy()).toThrow(
      "Cannot destructure 'undefined' or 'null'."
    );

    expect(() => new abstractPolicy({ canEdit: true })).toThrow(
      "policies should only functions"
    ); // when the policy is not a function
  });
});

describe("success", () => {
  test("truthy true when the polices are functions", () => {
    expect(() => {
      new abstractPolicy({
        canEdit() {
          return true;
        },
      });
    }).toBeTruthy();
  });
});
