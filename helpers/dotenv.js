const { config } = require("dotenv");
class dotenv {
  constructor() {
    config();
    return this.find;
  }

  find(key) {
    if (!key) throw Error("key param is missing !");
    if (typeof key !== "string") throw Error("key param should only string");
    if (!process.env[key]) throw Error("key not exist");
    return process.env[key];
  }
}

module.exports = new dotenv();
