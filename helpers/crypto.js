const $crypto = require("crypto-js");
const nodeCrypto = require("crypto");

class crypto {
  hash(key) {
    if (!key) throw Error("key param is missing");
    if (typeof key !== "string")
      throw Error("invalid param datatype , key param should only string");
    return $crypto.SHA256(key).toString();
  }
}

module.exports = new crypto();
