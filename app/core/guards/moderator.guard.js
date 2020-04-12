const AbstractGuard = require("./abstract_guard");
class guard extends AbstractGuard {
  constructor({ id }) {
    try {
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
