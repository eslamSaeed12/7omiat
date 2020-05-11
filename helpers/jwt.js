const jwt = require("jsonwebtoken");

class jwtHelper {
  encode(payload, secret) {
    if (!payload) throw Error("payload is missing");
    if (!secret) throw Error("secret key is missing");
    if (typeof secret !== "string") throw Error("secret key only string");

    return jwt.sign(payload, secret);
  }

  decode(token, secret) {
    if (!token) throw Error("jwt token is missing !");
    if (typeof token !== "string") throw Error("jwt token should only string");
    if (!secret) throw Error("secret key is missing");
    if (typeof secret !== "string") throw Error("secret key only string");
    return jwt.verify(token, secret);
  }
}

module.exports = new jwtHelper();
