class gate {
  constructor({ ...policies }) {
    this.policies = [];
    for (const i in policies) {
      if (typeof policies[i] !== "function") {
        throw Error("policies should only functions");
      }
      this.policies[i] = policies[i];
    }
  }

  define(policyName, cb) {
    if (!typeof cb === "function")
      throw Error("define policy allows callback to be function ");

    if (!policyName) {
      throw Error("policy name is required");
    }

    if (typeof policyName !== "string") {
      throw Error("policy name should only string");
    }
    this.policies[policyName] = cb;

    return Boolean(this.policies[policyName]);
  }

  isValidPolicy({ policyName }) {
    if (!policyName) {
      throw Error("policy name is required");
    }

    if (typeof policyName !== "string") {
      throw Error("policy name should only string");
    }

    return true;
  }
  can(policyName, { ...args }) {
    if (!this.isValidPolicy({ policyName }))
      throw Error("policy name is not valid");

    if (!this.policies[policyName])
      throw Error("policy is not valid or maybe not defined");

    return Boolean(this.policies[policyName]({ ...args }));
  }
}

module.exports = gate;
