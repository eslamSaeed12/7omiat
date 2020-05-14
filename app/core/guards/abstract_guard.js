class gaurd {
  constructor() {

    this._ = require("lodash");

    const enums = require("../../../configs/roles.enums.json");

    if (!Array.isArray(enums)) throw Error("enums should be array");

    if (!enums.length) throw Error("enums roles array empty from roles");
    
    enums.forEach((r) => {

      if (!r.role)
        throw Error(
          "bad schema > expected 'role atribute in roles array object schema'"
        );

      if (typeof r.role !== "string")
        throw Error("every role should be a string");
    });
    this.roles = enums;
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
      process.env.NODE_ENV === "development" ? console.log(e) : null;
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
      process.env.NODE_ENV === "development" ? console.log(e) : null;
    }
  }
}

module.exports = gaurd;
