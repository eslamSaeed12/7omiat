class gaurd {
  constructor() {
    this._ = require("lodash");
    this.roles = require("../../../configs/roles.enums.json");
    this.user = require("../../../models/index").user;
  }

  async isAuthenticated({ id }) {
    try {
      if (typeof id !== "string") return false;
      if (!(await this.checker(this.role))) {
        throw new Error("this role is not exist in app roles");
      }

      const user = await this.user.findByPk(id, { include: "role" });

      if (!user) {
        return false;
      }

      if (user.role.title !== this.role) {
        return false;
      }

      return user;
    } catch (e) {
      console.log(e);
    }
  }
  checker() {
    try {
      // check if role stanadard with the roles enums
      const role_ = this._.find(this.roles, (r) => r.role === this.role);
      if (!role_) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = gaurd;
