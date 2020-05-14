const abstractPolicy = require("./policies/abstract.policies");

// declare policies here

module.exports = new abstractPolicy({
  isSuperUser({ user }) {
    if (user && user.role && user.role.title === "superuser") {
      return true;
    }
    return false;
  },
});
