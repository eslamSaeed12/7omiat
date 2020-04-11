const { config } = require("dotenv");
class dotenv {
  constructor() {
    config();

    return this.find;
  }

  find(key) {
    try {
      if (!key) throw new Error("key param is missing !");
      if (typeof key !== "string")
        throw new Error("key param should only string");
      return process.env[key];
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new dotenv();
