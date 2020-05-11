const striper = require("striptags");
class sanitizer {
  $str(str) {
    if (!str) throw Error("str param is missing !");
    if (typeof str !== "string") throw Error("str param should only string");

    return striper(str);
  }

  $int(int) {
    if (!int) throw Error("int param is missing !");
    if (Number.isNaN(Number(int))) {
      throw Error("int param should be valid number");
    }
    return Number.parseInt(int);
  }

  $float(float) {
    if (!float) throw Error("float param is missing !");
    if (typeof float !== "number") throw Error("not valid number");
    if (!(float % 1 !== 0)) {
      throw Error("not valid float");
    }
    return Number.parseFloat(float);
  }
}

module.exports = new sanitizer();
