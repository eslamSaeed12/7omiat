const AbstractGuard = require("./abstract_guard");
class guard extends AbstractGuard {
  constructor({ id }) {
    try {
      if (!id) throw Error("id is required");
      if (typeof id !== "string") throw Error("id should be a string");
      super();
      this.role = "moderator";
      return this.isAuthenticated({ id });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = (id) => {
  return new guard(id);
};
