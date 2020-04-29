const jwt = require("jsonwebtoken");

class jwtHelper {
  encode(payload, secret) {
    try {
      if (!payload) throw new Error("payload is missing");
      if (typeof payload !== "object")
        throw new Error("payload should only object");
      if (!secret) throw new Error("secret key is missing");
      if (typeof secret !== "string") throw new Error("secret key only string");
      return jwt.sign(payload, secret);
    } catch (e) {
      console.log(e);
    }
  }

  decode(token, secret) {
    try {
      if (!token) throw new Error("jwt token is missing !");
      if (typeof token !== "string")
        throw new Error("jwt token should only string");
      if (!secret) throw new Error("secret key is missing");
      if (typeof secret !== "string") throw new Error("secret key only string");

      return jwt.verify(token, secret);
    } catch (e) {
      if (e.message === "invalid token") return false;
      if (e.message === "invalid signature") return false;
      if (e.message === "jwt malformed") return false;
      else console.log(e);
    }
  }
}

module.exports = new jwtHelper();
