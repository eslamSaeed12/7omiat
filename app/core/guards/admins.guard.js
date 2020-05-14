const AbstractGuard = require("./abstract_guard");
class guard extends AbstractGuard {
  constructor({ id }) {
    try {
      if (!id) throw Error("id is required");
      if (typeof id !== "string") throw Error("id should be a string");
      super();
      this.role = ["superuser", "moderator"];
      return this.isAuthenticated({ id });
    } catch (e) {
      process.env.NODE_ENV === "development" ? console.log(e) : null;
    }
  }
}

module.exports = (id) => {
  return new guard(id);
};
