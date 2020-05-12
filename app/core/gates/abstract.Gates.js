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
    if (!policyName) throw Error("policy name is required");

    if (typeof policyName !== "string")
      throw Error("policy name should only string");

    if (typeof cb !== "function")
      throw Error("define policy allows callback to be function");

    this.policies[policyName] = cb;

    return Boolean(this.policies[policyName]);
  }

  can(policyName, ...args) {
    if (!policyName) throw Error("policy name is required");

    if (typeof policyName !== "string")
      throw Error("policy name should only string");

    if (!this.policies[policyName])
      throw Error("policy is not valid or maybe not defined");

    return Boolean(this.policies[policyName](...args));
  }
}

module.exports = gate;
