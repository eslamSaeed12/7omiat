const $crypto = require("crypto-js");
const nodeCrypto = require("crypto");

class crypto {
  hash(key) {
    try {
      if (!key) throw new Error("key param is missing");
      if (typeof key !== "string")
        throw new Error("key param should only string");
      return $crypto.SHA256(key).toString();
    } catch (e) {
      console.log(e);
    }
  }

  randomBytes(num = 32) {
    return nodeCrypto.randomBytes(num).toString("hex");
  }
}

module.exports = new crypto();
