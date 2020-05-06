class policies {
  constructor({ ...args }) {
    for (const i in args) {
      if (typeof args[i] !== "function") {
        throw Error("policies should only functions");
      }
      this[i] = args[i];
    }
  }
}

module.exports = policies;
