class gaurd {
  constructor() {
    this._ = require("lodash");
    this.roles = require("../../../configs/roles.enums.json");
    this.user = require("../../../models/index").user;
  }

  async isAuthenticated({ id }) {
    try {
      if (typeof id !== "string") return false;
      if (!this.checker()) {
        throw new Error("this role is not exist in app roles");
      }

      const user = await this.user.findByPk(id, { include: "role" });

      if (!user) {
        return false;
      }

      if (Array.isArray(this.role)) {
        if (this.role.includes(user.role.title)) {
          return user;
        }
      } else {
        return user.role.title !== this.role ? false : user;
      }
    } catch (e) {
      console.log(e);
    }
  }
  checker() {
    try {
      if (Array.isArray(this.role)) {
        // original
        const rolesFlatten = [this.roles[0].role, this.roles[1].role];
        const intersect = this._.intersection(rolesFlatten, this.role);
        return this._.isEqual(intersect.sort(), this.role.sort());
      } else {
        // check if role stanadard with the roles enums
        const role_ = this._.find(this.roles, (r) => r.role === this.role);
        if (!role_) {
          return false;
        }
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = gaurd;
