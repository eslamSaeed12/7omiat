const $crypto = require("crypto-js");
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
}

module.exports = new crypto();
